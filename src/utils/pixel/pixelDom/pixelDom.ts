import { Attributes } from '../parser';
import { Component, Methods } from '../utils';
import { NODE_TYPE } from './const';
import { VElement, VTextNode } from './pixelDom.type';

class PixelDOM {
  eventCache: Record<string, Methods[]> = {};

  /* prettier-ignore */
  createElement = (
    type: string = NODE_TYPE.ELEMENT_NODE,
    tagName: string,
    attrs: Attributes,
    handlers?: Methods,
  ): VElement => {
    const node: VElement = {
      type,
      tagName,
      attrs: {
        ...attrs,
      },
      parent: null,
      children: [],
    };

    if (handlers) {
      node.propHandlers = handlers;
    }

    return node;
  };

  createTextNode = (text: string): VTextNode => ({
    type: NODE_TYPE.TEXT_NODE,
    text,
    parent: null,
  });

  mountTextNode = (node: VTextNode): Text => document.createTextNode(node.text);

  mountNode = (node: VElement | Component): HTMLElement => {
    const domNode = window.document.createElement(node.tagName);

    /* attribute setting */
    Object.entries(node.attrs).forEach(([key, value]) => {
      domNode.setAttribute(key, String(value));
    });

    /* link between parent and children */
    node.children.forEach((child: VElement | Component, index: number) => {
      if (child.type !== NODE_TYPE.TEXT_NODE) {
        this.parentConnection(node, child, index);
      }
      if (child.domEl) {
        domNode.appendChild(child.domEl);
      }
    });
    return domNode;
  };

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
  parentConnection = (currentNode: Component | VElement, node: Component | VElement, index: number) => {
    node.keyIndex = index;

    if (node.type === NODE_TYPE.COMPONENT_NODE) {
      (node as Component).setParentVNode(currentNode);
    } else {
      node.parent = currentNode;
    }

    if (node.propHandlers) {
      Object.keys(node.propHandlers).forEach((event: string) => {
        const { name } = node.propHandlers![event];
        if (this.eventCache[name]) {
          this.eventCache[name].push({ ...node.propHandlers![event], target: node.domEl! });
        } else {
          this.eventCache[name] = [{ ...node.propHandlers![event], target: node.domEl! }];
        }
      });
    }

    if ((currentNode as Component).methods) {
      Object.keys((currentNode as Component).methods).forEach((handlerName: string) => {
        if (this.eventCache[handlerName]) {
          (currentNode as Component).addListener(this.eventCache[handlerName], handlerName);
        }
      });
    }
  };
}

export { PixelDOM, NODE_TYPE };
