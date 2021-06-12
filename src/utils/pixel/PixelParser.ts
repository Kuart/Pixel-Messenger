import Stack from '../structures/stack';
import { Pixel } from './Pixel';
import { PixelDOM, PNode } from './PixelDOM';

export interface IParsedTag {
  tagName: string;
  attrs: Record<string, string | number | boolean>;
  type: string;
}
class PixelParser {
  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  componentRegExp = /<[\\/]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  tagNameRegExp = /<\/?([^\s]+?)[/\s>]/;

  pixelDOM: PixelDOM;

  stack: Stack<PNode>;

  instance: Pixel;

  constructor(instance: Pixel) {
    this.pixelDOM = new PixelDOM();
    this.stack = new Stack();
    this.instance = instance;
  }

  parseHTML = (html: string): PNode => {
    let result = null;
    html.replace(this.tagRegExp, (tag: string, index: number) => {
      const start = index + tag.length;
      const nextChar = html.charAt(start);
      const isOpen = tag[1] !== '/';

      if (tag.match(this.componentRegExp)) {
        const componentInstant = this.parseComponent(tag);
      } else if (!isOpen) {
        const closedTag = this.stack.pop();
        const parentTag = this.stack.peek();
        if (!parentTag) {
          result = closedTag;
        } else {
          parentTag.value.children.push(closedTag);
        }
      } else {
        const { tagName, type, attrs } = this.parseTag(tag);
        const element = this.pixelDOM.createElement(type, tagName, attrs);
        if (nextChar && nextChar !== '<') {
          const text = html.slice(start, html.indexOf('<', start)).trim();
          if (text.length) {
            element.children.push(text);
          }
        }
        this.stack.push(element);
      }
    });
    return result;
  };

  parseComponent(tag: string) {
    const [_, tagName] = tag.match(this.tagNameRegExp);
    const { template, data, components } = this.instance.components[tagName]();
    const dom = this.parseHTML(template);
    console.log(dom);
  }

  parseTag = (tag: string): IParsedTag => {
    const reg = new RegExp(this.attrRegExp);
    const attrs: Record<string, string | number | boolean> = {};
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];

    let isEmpty = false;
    while (!isEmpty) {
      const result: RegExpExecArray | null = reg.exec(tag);
      if (result) {
        const [attr, value] = result[0].trim().split('=');
        if (!value) {
          const attrName = attr[0] === '!' ? attr.substring(1) : attr;
          attrs[attrName] = attr[0] !== '!';
        } else {
          attrs[attr] = value.substring(1, value.length - 1);
        }
      } else {
        isEmpty = true;
      }
    }

    return { tagName, type: 'node', attrs };
  };
}

export { PixelParser };
