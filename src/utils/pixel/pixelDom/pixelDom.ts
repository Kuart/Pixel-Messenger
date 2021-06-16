import { Attributes } from '../parser';
import { Component, Methods } from '../utils';
import { VirtualNode, VElement, VTextNode } from './pixelDom.type';

const NODE_TYPE = {
  TEXT_NODE: 'text',
  ELEMENT_NODE: 'element',
  COMPONENT_NODE: 'component',
};

class PixelDOM {
  eventCache: Record<string, Methods[]> = {};

  createElement = (
    type: string = NODE_TYPE.ELEMENT_NODE,
    tagName: string,
    attrs: Attributes,
    handlers: Methods
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
    domEl: null,
  });

  mount = (nodeEl: VirtualNode): HTMLElement | Text => {
    let domNode: HTMLElement | Text = null;

    if (nodeEl.type === NODE_TYPE.ELEMENT_NODE || nodeEl.type === NODE_TYPE.COMPONENT_NODE) {
      const currentNode = nodeEl as VElement | Component;
      domNode = window.document.createElement(currentNode.tagName);

      /* attribute setting */
      Object.entries(currentNode.attrs).forEach(([key, value]) => {
        (domNode as HTMLElement).setAttribute(key, String(value));
      });

      /* link between parent and children */
      currentNode.children.forEach((node, index: number) => {
        this.parentConnection(currentNode, node, index, domNode as HTMLElement);
        domNode.appendChild(node.domEl);
      });
    } else {
      const currentNode = nodeEl as VTextNode;
      domNode = document.createTextNode(currentNode.text);
    }
    return domNode;
  };

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
  parentConnection = (currentNode: VirtualNode, node: Component | VElement, index: number, domNode: HTMLElement) => {
    node.keyIndex = index;

    if (node.type === NODE_TYPE.COMPONENT_NODE) {
      (node as Component).setParentNode(domNode);
    } else {
      node.parent = domNode;
    }

    if ((node as Component | VElement).propHandlers) {
      Object.keys(node.propHandlers).forEach((event: string) => {
        const { name } = node.propHandlers[event];
        if (this.eventCache[name]) {
          this.eventCache[name].push({ ...node.propHandlers[event], target: node.domEl });
        } else {
          this.eventCache[name] = [{ ...node.propHandlers[event], target: node.domEl }];
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
