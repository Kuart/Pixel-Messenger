import Stack from '../structures/stack';
import PixelDOM, { PNode } from './pixelDOM';

export interface IParsedTag {
  tagName: string;
  attrs: Record<string, string | number | boolean>;
  type: string;
}
class PixelParser {
  private tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  private componentRegExp = /<[\\/]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  private attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  private wsRegExp = /^\s*$/;

  private pixelDOM: PixelDOM;

  private stack: Stack<PNode>;

  constructor() {
    this.pixelDOM = new PixelDOM();
    this.stack = new Stack();
  }

  parseHTML = (template: string): PNode => {
    let result = null;
    template.replace(this.tagRegExp, (tag: string) => {
      const isOpen = tag[1] !== '/';

      if (!isOpen) {
        const closedTag = this.stack.pop();
        const parentTag = this.stack.peek();
        if (!parentTag) {
          result = closedTag;
        } else {
          parentTag.value.children.push(closedTag);
        }
      }

      if (isOpen && tag.match(this.componentRegExp)) {
        console.log(tag, 'Component');
      } else if (isOpen) {
        const { tagName, type, attrs } = this.parseTag(tag);
        const element = this.pixelDOM.createElement(type, tagName, attrs);
        this.stack.push(element);
      }
    });
    return result;
  };

  parseTag = (tag: string): IParsedTag => {
    const reg = new RegExp(this.attrRegExp);
    const attrs: Record<string, string | number | boolean> = {};
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];

    while (true) {
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
        break;
      }
    }

    return { tagName, type: 'node', attrs };
  };
}

export default PixelParser;
