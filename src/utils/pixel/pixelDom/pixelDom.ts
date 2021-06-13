import Component from '../utils/Component';
import { VNode, VTextNode } from './pixelDom.type';

const NODE_TYPE = {
  TEXT_NODE: 'text',
  ELEMENT_NODE: 'element',
  COMPONENT_NODE: 'component',
};

class PixelDOM {
  createElement = (
    type: string = NODE_TYPE.ELEMENT_NODE,
    tagName: string,
    props: Record<string, string | number | boolean>
  ): VNode => ({
    type,
    tagName,
    props: {
      ...props,
    },
    parent: null,
    children: [],
  });

  createTextNode = (text: string): VTextNode => ({
    type: NODE_TYPE.TEXT_NODE,
    text,
    parent: null,
    domEl: null,
  });

  mount = (nodeEl: VNode | VTextNode | Component): HTMLElement | Text => {
    let domNode: HTMLElement | Text = null;

    if (nodeEl.type === NODE_TYPE.ELEMENT_NODE || nodeEl.type === NODE_TYPE.COMPONENT_NODE) {
      const currentNode = nodeEl as VNode;
      domNode = window.document.createElement(currentNode.tagName);

      Object.entries(currentNode.props).forEach(([key, value]) => {
        (domNode as HTMLElement).setAttribute(key, String(value));
      });

      currentNode.children.forEach((node, index: number) => {
        node.keyIndex = index;

        if (node.type === NODE_TYPE.COMPONENT_NODE) {
          node.setParentNode(domNode);
        } else {
          node.parent = domNode;
        }

        domNode.appendChild(node.domEl);
      });
    } else {
      const currentNode = nodeEl as VTextNode;
      domNode = document.createTextNode(currentNode.text);
    }
    return domNode;
  };
}

export { PixelDOM, NODE_TYPE };
