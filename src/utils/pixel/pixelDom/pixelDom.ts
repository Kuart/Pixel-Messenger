import { DFS, Stack } from '../utils';
import { NODE_TYPE } from './const';
import NodeFabric from './NodeFabric';
import { ParentNodeType, VTextNode, VirtualNode } from './Nodes';

class PixelDOM {
  static instantce: PixelDOM;

  nodeFabric: NodeFabric;

  constructor() {
    if (PixelDOM.instantce) {
      return PixelDOM.instantce;
    }

    this.nodeFabric = new NodeFabric();

    PixelDOM.instantce = this;
  }

  mountTextNode = (node: VTextNode): Text => {
    const domNode = document.createTextNode(node.text);
    node.domEl = domNode;
    return domNode;
  };

  mountNode = (node: ParentNodeType): VirtualNode => {
    const domNode = window.document.createElement(node.tagName);

    Object.entries(node.props).forEach(([key, value]) => {
      domNode.setAttribute(key, value);
    });

    /* link between parent and children */
    node.children.forEach((child: ParentNodeType, index: number) => {
      node.keyIndex = index;
      node.setParentNode(node);

      if (child.domEl) {
        domNode.appendChild(child.domEl);
      }
    });

    node.domEl = domNode;

    return node;
  };
}

const pixelDOM = new PixelDOM();

export { pixelDOM, NODE_TYPE };
