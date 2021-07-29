import { ParentNodeType, pixelDOM, VCommonNode, VirtualNode, VTextNode } from '../pixelDom';
import { Stack } from '../utils';
import { TagParser } from './tagParser';
import { ComponentParser } from './componentParser';
import { IData, IParentData } from './parser.type';
import { TextParser } from './textParser';

export default class PixelParser {
  tagRegExp = /<[\s*]?[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  componentRegExp = /<[\\/]?[\s*]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  tagParser: TagParser;

  componentParser: ComponentParser;

  textParser: TextParser;

  constructor() {
    this.tagParser = new TagParser(this);
    this.componentParser = new ComponentParser(this);
    this.textParser = new TextParser(this);
  }

  parseHTML(html: string, parentProps?: IParentData): ParentNodeType {
    const stack = new Stack<ParentNodeType>();
    const ignoreStack = new Stack<ParentNodeType>();
    const tagReg = new RegExp(this.tagRegExp);
    let el = null;

    const { componentProps = {}, state = {}, methods = {} } = parentProps || {};
    const data: IData = { props: componentProps, state, methods };

    do {
      el = tagReg.exec(html);
      if (el) {
        const isIgnoreStackEmpty = ignoreStack.isEmpty();
        const tag = el[0];
        const { index } = el;

        const isComponent = this.isComponent(tag);
        const isXHTML = this.isXHTML(tag);
        const isCloseTag = tag[1] === '/';

        if (isComponent) {
          if (isIgnoreStackEmpty) {
            const component = this.componentParser.parse(tag, parentProps);

            if (component && Array.isArray(component)) {
              component.forEach((item) => this.addAsChild(stack, item));
            } else if (component) {
              this.addAsChild(stack, component);
            }
          }
        } else if (isXHTML) {
          if (isIgnoreStackEmpty) {
            const parsedTag = this.tagParser.parse(tag, data);

            if (parsedTag.isDisplay) {
              const node: VCommonNode = pixelDOM.nodeFabric.create(parsedTag) as VCommonNode;

              this.addAsChild(stack, node);
            }
          }
        } else if (isCloseTag) {
          if (isIgnoreStackEmpty) {
            const node = stack.pop();

            this.addAsChild(stack, node);
          } else {
            ignoreStack.pop();
          }
        } else {
          let textNode = null;
          const start = index + tag.trim().length;
          const nextChar = html[start];

          const parsedTag = this.tagParser.parse(tag, data);
          const node: VCommonNode = pixelDOM.nodeFabric.create(parsedTag) as VCommonNode;

          if (nextChar && nextChar !== '<') {
            const text = html.slice(start, html.indexOf('<', start)).trim();
            textNode = this.textParser.parse(text, data);
          }

          if (isIgnoreStackEmpty && parsedTag.isDisplay) {
            stack.push(node);

            if (textNode) {
              this.addAsChild(stack, textNode);
            }
          } else {
            ignoreStack.push(node);
          }
        }
      }
    } while (el);

    return stack.pop();
  }

  addAsChild = (stack: Stack<ParentNodeType>, node: VirtualNode) => {
    const parent = stack.peek();

    if (parent) {
      parent.children.push(node);
    } else if (!(node instanceof VTextNode)) {
      stack.push(node);
    }
  };

  isComponent = (tag: string) => tag.match(this.componentRegExp);

  isXHTML = (tag: string) => tag[tag.length - 2] === '/';
}

export const Parser = new PixelParser();
