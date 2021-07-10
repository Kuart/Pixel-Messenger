import { NODE_TYPE } from './const';
import NodeFabric from './NodeFabric';
import { EventHadnlerConfig, ParentNodeType, VComponentNode, VTextNode } from './Nodes';

class PixelDOM {
  nodeFabric: NodeFabric;

  eventCache: Map<string, EventHadnlerConfig[]> = new Map();

  constructor() {
    this.nodeFabric = new NodeFabric();
  }

  mountTextNode = (node: VTextNode): Text => document.createTextNode(node.text);

  mountNode = (node: ParentNodeType): HTMLElement => {
    const domNode = window.document.createElement(node.tagName);

    /* attribute setting */
    Object.entries(node.attrs).forEach(([key, value]) => {
      domNode.setAttribute(key, String(value));
    });

    /* link between parent and children */
    node.children.forEach((child: ParentNodeType, index: number) => {
      if (!(child instanceof VTextNode)) {
        this.parentConnection(node, child, index);
      }

      if (child.domEl) {
        domNode.appendChild(child.domEl);
      }
    });
    return domNode;
  };

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node"] }] */
  parentConnection = (currentNode: ParentNodeType, node: ParentNodeType, index: number) => {
    node.keyIndex = index;

    node.setParentNode(currentNode);

    if (node.propHandlers) {
      Object.keys(node.propHandlers).forEach((event: string) => {
        const { name } = node.propHandlers![event];
        if (this.eventCache.has(name)) {
          this.clearUnmountHadnler(name, node.domEl!);
          this.eventCache.get(name)!.push({ ...node.propHandlers![event], target: node.domEl! });
        } else {
          this.eventCache.set(name, [{ ...node.propHandlers![event], target: node.domEl! }]);
        }
      });
    }

    if (currentNode instanceof VComponentNode && currentNode.methods) {
      Object.keys(currentNode.methods).forEach((handlerName: string) => {
        if (this.eventCache.has(handlerName)) {
          this.eventCache.get(handlerName)!.forEach((handler) => {
            currentNode.addListener(handler, handlerName);
          });
        }
      });
    }
  };

  clearUnmountHadnler(name: string, target: HTMLElement) {
    let local = null;
    if (this.eventCache.has(name)) {
      this.eventCache.get(name)!.forEach((handler, index) => {
        if (handler.target === target) {
          local = this.eventCache.get(name)!;
          local.splice(index, 1);

          this.eventCache.set(name, local);
        }
      });
    }
  }
}

export { PixelDOM, NODE_TYPE };
