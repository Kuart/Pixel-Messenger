import { Pixel } from '../pixel';
import { NODE_TYPE, PixelDOM, VElement } from '../pixelDom';
import { Stack, Component, Methods, Props } from '../utils';
import { Attributes, IParsedTag } from './parser.type';

const PREFIXES = {
  BIND: 'b:',
  STATIC: 's:',
  HANLDER: 'e:',
  PROPS: 'p:',
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

        const isComponent = tag.match(this.componentRegExp);
        const isXHTML = tag[tag.length - 2] === '/';

        if (isComponent) {
          const parentTag = stack.peek();
          const component = this.parseComponent(tag, parentComponent);
          component.domEl = this.pixelDOM.mount(component);

          if (parentTag) {
            parentTag.value.children.push(component);
          }
        } else if (isXHTML) {
          const { propHandlers, tagName, attrs } = this.parseTag(tag, [], parentComponent);
          const element = this.pixelDOM.createElement(NODE_TYPE.ELEMENT_NODE, tagName, attrs, propHandlers);
          element.domEl = this.pixelDOM.mount(element) as HTMLElement;

          const parentTag = stack.peek();

          if (parentTag) {
            parentTag.value.children.push(element);
          }
        } else {
          const isOpen = tag[1] !== '/';

          if (!isOpen) {
            const closedTag = stack.pop();
            const parentTag = stack.peek();
            closedTag.domEl = this.pixelDOM.mount(closedTag) as HTMLElement;

            if (parentTag) {
              parentTag.value.children.push(closedTag);
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
      this.parseText(html, parentComponent, parentComponent);
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
      textNode.domEl = this.pixelDOM.mount(textNode) as Text;
      parentNode.children.push(textNode);
    }
  }

  parseComponent(tag: string, parentComponent?: Component) {
    const [_, componentName] = tag.match(this.tagNameRegExp);
    const { template, components, state, usedProps, methods } = this.instance.components[componentName]();

    if (components) {
      this.instance.registerComponents(components);
    }

    const [firstTag, ...tags] = template.match(this.tagRegExp);

    /* //TODO  component inside component */
    /* if (firstTag.match(this.componentRegExp)) {
      const component = this.parseComponent(firstTag);
    } */

    const { tagName, attrs, props, propHandlers } = this.parseTag(firstTag, usedProps, parentComponent, tag);

    /* const componentMethods: Methods = Object.entries(methodsType).reduce(
      (acc: Methods, item: [string, { event: string }]) => {
        const [key, value] = item;
        acc[key] = { event: value.event, handler: methods[key] };
        return acc;
      },
      {}
    ); */

    const component = new Component({ tagName, props, attrs, state, methods, propHandlers });
    const start = firstTag.length;
    const end = template.trim().length - tags[tags.length - 1].length;

    return this.parseHTML(`${template.trim().substring(start, end)}`, component);
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
        const currentValue = value.substring(1, value.length - 1);
        const cleanName = name.substring(2);
        const type = name.substring(0, 2);

        if (type === PREFIXES.STATIC) {
          props[cleanName] = currentValue;
        } else if (type === PREFIXES.PROPS) {
          if (currentValue in parentComponent.props) {
            const propsValue = this.parseObjectPathTag(parentComponent.props, currentValue);
            attrs[cleanName] = propsValue;
            props[cleanName] = propsValue;
          }
        } else if (type === PREFIXES.BIND) {
          const [propName] = currentValue.split('.');

          if (propName in parentComponent.props) {
            props[cleanName] = this.parseObjectPathTag(parentComponent.props, currentValue);
          } else if (propName in parentComponent.state) {
            props[cleanName] = this.parseObjectPathTag(parentComponent.state, currentValue);
          }
        } else if (type === PREFIXES.HANLDER) {
          if (!propHandlers) {
            propHandlers = {};
          }
          propHandlers[currentValue] = { event: name.substring(2), name: currentValue };
        } else {
          attrs[name] = currentValue;
          props[name] = currentValue;
        }
      }
    } while (attr);

    return { tagName, attrs, propHandlers, props };
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
}
