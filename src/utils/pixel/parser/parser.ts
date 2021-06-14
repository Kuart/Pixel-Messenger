import { Pixel } from '../pixel';
import { NODE_TYPE, PixelDOM, VNode } from '../pixelDom';
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
    const stack = new Stack<VNode | Component>();
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
          const { tagName, type, attrs } = this.parseTag(tag, NODE_TYPE.ELEMENT_NODE);
          const element = this.pixelDOM.createElement(type, tagName, attrs);
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

            const { tagName, type, attrs } = this.parseTag(tag, NODE_TYPE.ELEMENT_NODE);
            const element = this.pixelDOM.createElement(type, tagName, attrs);

            if (nextChar && nextChar !== '<') {
              const text = html.slice(start, html.indexOf('<', start)).trim();
              this.parseText(text, parentComponent, element);
            }
            stack.push(element);
          }
        }
      }
    } while (el);

    if (/^{{.+}}$/gi.test(html)) {
      this.parseText(html, parentComponent, parentComponent);
    }

    return stack.pop();
  }

  parseText(text: string, parentComponent: Component, parentNode: VNode | Component) {
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
    if (firstTag.match(this.componentRegExp)) {
      const component = this.parseComponent(firstTag);
      console.log(component);
    }

    const { tagName, attrs, methodsType, props } = this.parseComponentTag(firstTag, usedProps, parentComponent, tag);
    console.log(methods);
    const componentMethods: Methods = Object.entries(methodsType).reduce(
      (acc: Methods, item: [string, { event: string }]) => {
        const [key, value] = item;
        acc[key] = { event: value.event, handler: methods[key] };
        return acc;
      },
      {}
    );

    const component = new Component({ tagName, componentMethods, props, attrs, state });

    const start = firstTag.length;
    const end = template.trim().length - tags[tags.length - 1].length;

    return this.parseHTML(`${template.trim().substring(start, end)}`, component);
  }

  parseTag = (tag: string, type: string, parentComponent?: Component): IParsedTag => {
    const reg = new RegExp(this.attrRegExp);
    let attr: RegExpExecArray | null = null;

    const attrs: Attributes = {};

    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];

    do {
      attr = reg.exec(tag);
      if (attr) {
        const [name, value] = attr[0].trim().split('=');
        const currentValue = value.substring(1, value.length - 1);

        if (type === PREFIXES.PROPS) {
        } else {
          attrs[name] = currentValue;
        }
      }
    } while (attr);

    return { tagName, type, attrs };
  };

  /*  no pref - attribute
      s - static string/number
      b - value from parent state/props
      on - event
  */
  parseComponentTag = (
    tag: string,
    reqProps: string[] = [],
    parentComponent?: Component,
    componentTag?: string
  ): IParsedTag => {
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];
    const currentTag = `${tag} ${componentTag ?? ''}`;
    const reg = new RegExp(this.attrRegExp);
    let attr: RegExpExecArray | null = null;

    const attrs: Attributes = {};
    const props = reqProps.reduce((acc: Props, item: string) => {
      acc[item] = null;
      return acc;
    }, {});

    const methodsType: Methods = {};

    do {
      attr = reg.exec(currentTag);
      if (attr) {
        const [name, value] = attr[0].trim().split('=');
        const currentValue = value.substring(1, value.length - 1);
        const cleanName = name.substring(2);
        const type = name.substring(0, 2);

        if (type === PREFIXES.STATIC) {
          props[cleanName] = currentValue;
        } else if (type === PREFIXES.BIND) {
          const [propName] = currentValue.split('.');

          if (propName in parentComponent.props) {
            props[cleanName] = this.parseObjectPath(parentComponent.props, currentValue);
          } else if (propName in parentComponent.state) {
            props[cleanName] = this.parseObjectPath(parentComponent.state, currentValue);
          }
        } else if (type === PREFIXES.HANLDER) {
          methodsType[currentValue] = { event: name.substring(2) };
        } else {
          attrs[name] = currentValue;
          props[name] = currentValue;
        }
      }
    } while (attr);
    return { tagName, attrs, methodsType, props };
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
}
