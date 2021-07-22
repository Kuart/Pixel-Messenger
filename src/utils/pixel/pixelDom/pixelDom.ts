import { NODE_TYPE, PATCH_TYPE } from './const';
import NodeFabric from './NodeFabric';
import { ParentNodeType, VTextNode, VirtualNode, VComponentNode } from './Nodes';
import { EVENTS } from '../../const';
import { Queue } from '../utils';

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

  render(node: VirtualNode) {
    if (node instanceof VTextNode) {
      return this.mountTextNode(node);
    }

    return this.mountNode(node);
  }

  mountTextNode = (node: VTextNode): Text => {
    const domNode = document.createTextNode(node.text);
    node.domEl = domNode;
    return domNode;
  };

  mountNode = (node: ParentNodeType): VirtualNode => {
    const domNode = window.document.createElement(node.tagName);
    node.domEl = domNode;
    node.eventBus.emit(EVENTS.NDM);

    this.setAttribute(node);

    /* link between parent and children */
    node.children.forEach((child: VirtualNode, index: number) => {
      child.setParentNode(node);

      if (child instanceof VTextNode) {
        this.mountTextNode(child);
      } else {
        child.keyIndex = index;
        this.mountNode(child);
      }

      domNode.appendChild(child.domEl);
    });

    return node;
  };

  setAttribute = (node: ParentNodeType) => {
    const props = Object.entries(node.props);
    props.forEach(([key, value]) => {
      node.domEl.setAttribute(key, value);
    });
  };

  patch = (oldTree: VComponentNode, newTree: VComponentNode) => {
    const oldNodeQueue = new Queue<VirtualNode>();
    const newNodeQueue = new Queue<VirtualNode>();

    oldNodeQueue.enqueue(oldTree);
    newNodeQueue.enqueue(newTree);

    while (!newNodeQueue.isEmpty()) {
      const oldNode = oldNodeQueue.dequeue();
      const newNode = newNodeQueue.dequeue();

      const isSame = this.diff(oldNode, newNode);

      if (isSame) {
      }
    }
  };

  diff(oldNode: VirtualNode, newNode: VirtualNode): keyof PATCH_TYPE | boolean {
    return false;
  }

  update(oldNode: VirtualNode, newNode: VirtualNode) {}
}

const pixelDOM = new PixelDOM();

export { pixelDOM, NODE_TYPE };
