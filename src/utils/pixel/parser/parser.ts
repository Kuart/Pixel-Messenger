import { Pixel } from '..';
import { ParentNodeType, VComponentNode } from '../pixelDom';
import { Stack } from '../utils';
import { EMOJI, PREFIXES } from './const';
import { TagParser } from './tagParser';
import { ComponentParser } from './componentParser';

export default class PixelParser {
  tagRegExp = /<[\s*]?[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  componentRegExp = /<[\\/]?[\s*]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  tagParser: TagParser;

  componentParser: ComponentParser;

  instance: typeof Pixel;

  constructor(instance: typeof Pixel) {
    this.tagParser = new TagParser(this);
    this.componentParser = new ComponentParser(this);
    this.instance = instance;
  }

  parseHTML(html: string) {
    const stack = new Stack<ParentNodeType>();
    const tagReg = new RegExp(this.tagRegExp);
    let el = null;

    do {
      el = tagReg.exec(html);
      if (el) {
        const tag = el[0];
        const { index } = el;

        const isComponent = this.isComponent(tag);
        const isXHTML = this.isXHTML(tag);
        const isCloseTag = tag[1] !== '/';

        if (isComponent) {
          const component = this.componentParser.parse(html);
        } else if (isXHTML) {
        } else if (isCloseTag) {
        } else {
        }
      }
    } while (el);

    return stack.pop();
  }

  findPropInParent = (prop: string, component: VComponentNode) => {
    if (component.pixelStore.has(prop)) {
      return this.instance.store.store[prop];
    }

    if (prop in component.props) {
      return component.props[prop];
    }

    if (prop in component.state) {
      return component.state[prop];
    }

    return null;
  };

  isComponent = (tag: string) => tag.match(this.componentRegExp);

  isXHTML = (tag: string) => tag[tag.length - 2] === '/';
}
