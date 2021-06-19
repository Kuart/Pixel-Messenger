import { Pixel } from '..';
import { NODE_TYPE, PixelDOM, VElement } from '../pixelDom';
import { Stack, Component, Methods, Props } from '../utils';
import { Attributes, IParsedTag } from './parser.type';

const PREFIXES = {
  BIND: 'b:',
  STATIC: 's:',
  HANLDER: 'e:',
  PROPS: 'p:',
  IF_CONDITION: 'if:',
  ELSE_CONDITION: 'else:',
  LOOP: 'loop:',
};
export default class PixelParser {
  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  componentRegExp = /<[\\/]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  tagNameRegExp = /<\/?([^\s]+?)[/\s>]/;

  replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  pixelDOM: PixelDOM;

  instance: Pixel;

  constructor(instance: Pixel) {
    this.pixelDOM = new PixelDOM();
    this.instance = instance;
  }

  parseHTML(html: string, parentComponent?: Component) {
    const stack = new Stack<VElement | Component>();
    const reg = new RegExp(this.tagRegExp);
    if (parentComponent) {
      stack.push(parentComponent);
    }
    let el = null;
    do {
      el = reg.exec(html);
      if (el) {
        const tag = el[0];
        const { index } = el;

        const isComponent = this.isComponent(tag);
        const isXHTML = this.isXHTML(tag);

        if (isComponent) {
          const parentTag = stack.peek();
          const component = this.parseComponent(tag, parentComponent);
          const isArray = Array.isArray(component);

          if (isArray) {
            component.forEach((element) => {
              element.domEl = this.pixelDOM.mountNode(element);
            });
          } else {
            component.domEl = this.pixelDOM.mountNode(component);
          }

          if (parentTag) {
            if (isArray) {
              parentTag.children.push(...component);
            } else {
              parentTag.children.push(component);
            }
          } else {
            stack.push(component);
          }
        } else if (isXHTML) {
          const { propHandlers, tagName, attrs } = this.parseTag(tag, [], parentComponent);
          const element = this.pixelDOM.createElement(NODE_TYPE.ELEMENT_NODE, tagName, attrs, propHandlers);
          element.domEl = this.pixelDOM.mountNode(element);

          const parentTag = stack.peek();

          if (parentTag) {
            parentTag.children.push(element);
          }
        } else {
          const isOpen = tag[1] !== '/';

          if (!isOpen) {
            const closedTag = stack.pop();
            const parentTag = stack.peek();
            closedTag.domEl = this.pixelDOM.mountNode(closedTag);

            if (parentTag) {
              parentTag.children.push(closedTag);
            } else if (stack.isEmpty()) {
              stack.push(closedTag);
            }
          } else {
            const start = index + tag.trim().length;
            const nextChar = html[start];

            const { propHandlers, tagName, attrs } = this.parseTag(tag, [], parentComponent);
            const element = this.pixelDOM.createElement(NODE_TYPE.ELEMENT_NODE, tagName, attrs, propHandlers);

            /* text node */
            if (nextChar && nextChar !== '<') {
              const text = html.slice(start, html.indexOf('<', start)).trim();
              this.parseText(text, parentComponent, element);
            }
            stack.push(element);
          }
        }
      }
    } while (el);

    /* handle replace element without html tags */
    if (/^{{.+}}$/gi.test(html)) {
      this.parseText(html, parentComponent!, parentComponent!);
    }
    return stack.pop();
  }

  parseText(text: string, parentComponent: Component, parentNode: VElement | Component) {
    if (text.length) {
      const prop = text.match(this.replaceRegExp);
      let replacedText = text;

      if (prop) {
        const replaced = this.findPropInParent(prop[0], parentComponent) ?? text;
        replacedText = replaced.toString();
      }

      const textNode = this.pixelDOM.createTextNode(replacedText);
      textNode.parent = parentNode;
      textNode.domEl = this.pixelDOM.mountTextNode(textNode) as Text;
      parentNode.children.push(textNode);
    }
  }

  parseComponent(tag: string, parentComponent?: Component) {
    const [_, componentName] = tag.match(this.tagNameRegExp);
    const { template, components, state, usedProps, methods } = this.instance.components[componentName]();

    const [firstTag, ...tags] = template.match(this.tagRegExp);

    if (components) {
      this.instance.registerComponents(components);
    }

    const isLoop = tag.indexOf('loop:');

    if (isLoop !== -1) {
      return this.loopHandler({ isLoop, componentName, parentComponent, tag });
    } else {
      const start = firstTag.length;
      const end = template.trim().length - tags[tags.length - 1].length;

      const { tagName, attrs, props, propHandlers } = this.parseTag(firstTag, usedProps, parentComponent, tag);
      const component = new Component({ tagName, props, attrs, state, methods, propHandlers });

      return this.parseHTML(`${template.trim().substring(start, end)}`, component);
    }
  }

  /*  no pref - attribute
      s: - static string/number
      b: - value from parent state/props
      e: - event
  */
  parseTag = (tag: string, reqProps: string[] = [], parentComponent?: Component, componentTag?: string): IParsedTag => {
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];
    const currentTag = `${tag} ${componentTag ?? ''}`;
    const reg = new RegExp(this.attrRegExp);
    let attr: RegExpExecArray | null = null;

    const attrs: Attributes = {};

    const props = reqProps.reduce((acc: Props, item: string) => {
      acc[item] = null;
      return acc;
    }, {});

    let propHandlers: Methods | null = null;

    do {
      attr = reg.exec(currentTag);
      if (attr) {
        const [name, value] = attr[0].trim().split('=');
        let cleanName = name;
        let type = name;

        const currentValue = value ? value.substring(1, value.length - 1) : '';
        const mod = name.indexOf(':');

        if (mod !== -1) {
          cleanName = cleanName.substring(mod + 1);
          type = type.substring(0, mod + 1);
        }

        if (type === PREFIXES.STATIC) {
          props[cleanName] = currentValue;
        } else if (type === PREFIXES.PROPS) {
          if (parentComponent && currentValue in parentComponent.props) {
            const propsValue = this.parseObjectPathTag(parentComponent.props, currentValue);
            attrs[cleanName] = propsValue;
            props[cleanName] = propsValue;
          }
        } else if (type === PREFIXES.BIND) {
          const [propName] = currentValue.split('.');

          if (parentComponent && propName in parentComponent.props) {
            props[cleanName] = this.parseObjectPathTag(parentComponent.props, currentValue);
          } else if (parentComponent && propName in parentComponent.state) {
            props[cleanName] = this.parseObjectPathTag(parentComponent.state, currentValue);
          }
        } else if (type === PREFIXES.HANLDER) {
          if (!propHandlers) {
            propHandlers = {};
          }
          propHandlers[currentValue] = { event: cleanName, name: currentValue };
        } else if (type === PREFIXES.IF_CONDITION || type === PREFIXES.ELSE_CONDITION) {
          console.log(type);
        } else {
          attrs[name] = currentValue;
        }
      }
    } while (attr);

    return { tagName, attrs, propHandlers, props };
  };

  loopHandler = (config: any) => {
    const { isLoop, parentComponent, tag, componentName } = config;
    const { template, state, usedProps, methods } = this.instance.components[componentName]();
    const [firstTag, ...tags] = template.match(this.tagRegExp);

    const components: Component[] = [];
    const arrayName = tag.substring(isLoop + PREFIXES.LOOP.length).split(' ')[0];
    console.log(arrayName);

    const start = firstTag.length;
    const end = template.trim().length - tags[tags.length - 1].length;

    if (parentComponent && arrayName in parentComponent!.state) {
      parentComponent.state[arrayName].forEach((element) => {
        const { tagName, attrs, props, propHandlers } = this.parseTag(firstTag, usedProps, parentComponent, tag);
        const component = new Component({
          tagName,
          props: { ...props, ...element },
          attrs,
          state,
          methods,
          propHandlers,
        });
        components.push(this.parseHTML(`${template.trim().substring(start, end)}`, component) as Component);
      });
    }

    return components;
  };

  findPropInParent = (prop: string, component: Component) => {
    const cleanProp = prop.substring(2, prop.length - 2).trim();

    if (cleanProp in component.props) {
      return component.props[cleanProp];
    }

    if (cleanProp in component.state) {
      return component.state[cleanProp];
    }

    return null;
  };

  parseObjectPath = (props: Props, path: string) => {
    try {
      const clearPath = path.substring(2, path.length - 2).trim();
      const keys = clearPath.split('.');

      let result = props;

      for (const key of keys) {
        const value = result[key];

        if (!value) {
          return '';
        }
        result = value;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  parseObjectPathTag = (props: Props, path: string) => {
    try {
      const keys = path.split('.');

      let result = props;

      for (const key of keys) {
        const value = result[key];

        if (!value) {
          return '';
        }
        result = value;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  isComponent = (tag: string) => tag.match(this.componentRegExp);
  isXHTML = (tag: string) => tag[tag.length - 2] === '/';
}
