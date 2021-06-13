import { Pixel } from '../pixel';
import { NODE_TYPE, PixelDOM, VNode } from '../pixelDom';
import { Stack } from '../utils';
import Component from '../utils/Component';
import { Attributes, Methods, IParsedTag } from './parser.type';

export default class PixelParser {
  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  componentRegExp = /<[\\/]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  tagNameRegExp = /<\/?([^\s]+?)[/\s>]/;

  pixelDOM: PixelDOM;

  instance: Pixel;

  constructor(instance: Pixel) {
    this.pixelDOM = new PixelDOM();
    this.instance = instance;
  }

  parseHTML(html: string, component?: Component) {
    const stack = new Stack<VNode | Component>();
    const reg = new RegExp(this.tagRegExp);

    if (component) {
      stack.push(component);
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
          const component = this.parseComponent(tag);
          const domEl = this.pixelDOM.mount(component);
          component.domEl = domEl;

          if (parentTag) {
            parentTag.value.children.push(component);
          }
        }

        if (!isComponent && isXHTML) {
          const { tagName, type, attrs } = this.parseTag(tag, NODE_TYPE.ELEMENT_NODE);
          const element = this.pixelDOM.createElement(type, tagName, attrs);
          const domEl = this.pixelDOM.mount(element) as HTMLElement;
          element.domEl = domEl;

          const parentTag = stack.peek();

          if (parentTag) {
            parentTag.value.children.push(element);
          }
        }

        if (!isComponent && !isXHTML) {
          const isOpen = tag[1] !== '/';

          if (!isOpen) {
            const closedTag = stack.pop();
            const parentTag = stack.peek();
            const domEl = this.pixelDOM.mount(closedTag) as HTMLElement;
            closedTag.domEl = domEl;

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
              if (text.length) {
                const textNode = this.pixelDOM.createTextNode(text);
                textNode.parent = element;
                textNode.domEl = this.pixelDOM.mount(textNode) as Text;
                element.children.push(textNode);
              }
            }
            stack.push(element);
          }
        }
      }
    } while (el);

    return stack.pop();
  }

  parseComponent(tag: string) {
    const [_, componentName] = tag.match(this.tagNameRegExp);
    const { template, data, components, props, methods } = this.instance.components[componentName]();

    if (components) {
      this.instance.registerComponents(components);
    }

    const [firstTag, ...tags] = template.match(this.tagRegExp);

    const { tagName, attrs, methodsType } = this.parseTag(firstTag, NODE_TYPE.COMPONENT_NODE);

    const componentMethods: Methods = Object.entries(methodsType).reduce(
      (acc: Methods, item: [string, { event: string }]) => {
        const [key, value] = item;
        acc[key] = { event: value.event, handler: methods[key] };
        return acc;
      },
      {}
    );

    const component = new Component({ tagName, componentMethods, props: attrs });

    const start = firstTag.length;
    const end = template.trim().length - tags[tags.length - 1].length;

    console.log(component);
    return this.parseHTML(template.trim().substring(start, end), component);
  }

  parseTag = (tag: string, type: string): IParsedTag => {
    const reg = new RegExp(this.attrRegExp);
    const attrs: Attributes = {};
    const props: Record<string, string | number | boolean> = {};
    const methodsType: Methods = {};
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];

    let isEmpty = false;

    while (!isEmpty) {
      const result: RegExpExecArray | null = reg.exec(tag);
      if (result) {
        const [attr, value] = result[0].trim().split('=');
        const currentValue = value.substring(1, value.length - 1);

        if (attr.substring(0, 2) === 'p-') {
          props[attr.substring(2)] = currentValue;
        } else if (attr.substring(0, 3) === 'on-') {
          methodsType[currentValue] = { event: attr.substring(3) };
        } else {
          attrs[attr] = currentValue;
        }
      } else {
        isEmpty = true;
      }
    }

    return { tagName, type, attrs, methodsType };
  };
}
