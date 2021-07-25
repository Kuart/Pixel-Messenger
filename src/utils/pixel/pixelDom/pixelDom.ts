import { NODE_TYPE, PATCH_TYPE } from './const';
import NodeFabric from './NodeFabric';
import { ParentNodeType, VTextNode, VirtualNode, VComponentNode, Props } from './Nodes';
import { EVENTS } from '../../const';
import { IPatch, PropsDiff } from './pixelDom.type';
import { BFS } from '../utils';

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

  mountTextNode = (node: VTextNode): VTextNode => {
    const domNode = document.createTextNode(node.text);
    node.domEl = domNode;
    return node;
  };

  mountNode = (node: ParentNodeType): VirtualNode => {
    const domNode = window.document.createElement(node.tagName);
    node.domEl = domNode;
    node.eventBus.emit(EVENTS.NDM);

    this.setProps(node);

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

  setProps = (node: ParentNodeType, newNode?: ParentNodeType, pDiff?: PropsDiff) => {
    if (pDiff) {
      pDiff.forEach((value, key) => {
        if (value === undefined) {
          this.removeAttribute(node, key, value);
        } else {
          this.setAttribute(node, key, value);
        }
        node.updateProps(newNode!.props);
      });
    } else {
      const props = Object.entries(node.props);
      props.forEach(([key, value]) => {
        this.setAttribute(node, key, value);
      });
    }
  };

  setAttribute = (node: ParentNodeType, key: string, value: string | boolean) => {
    if (typeof value === 'boolean' || key === 'value') {
      (node.domEl as any).value = value;
    } else if (value) {
      node.domEl.setAttribute(key, value);
    }
  };

  removeAttribute = (node: ParentNodeType, key: string, value: string | boolean) => {
    if (typeof value === 'boolean') {
      (node.domEl as any).value = false;
    } else if (key === 'value') {
      (node.domEl as any).value = '';
    } else {
      node.domEl.removeAttribute(key);
    }
  };

  patch = (oldNode: VComponentNode, newNode: VComponentNode) => {
    const patches: IPatch[] = [];
    this.diff(oldNode, newNode, patches);
    this.update(patches);
  };

  diff = (oldNode: VirtualNode, newNode: VirtualNode, patches: IPatch[]) => {
    if (oldNode.type !== newNode.type) {
      patches.push({
        type: PATCH_TYPE.REPLACE,
        newNode,
        oldNode,
      });
    } else if (newNode instanceof VTextNode) {
      if ((oldNode as VTextNode).text !== newNode.text) {
        patches.push({
          type: PATCH_TYPE.TEXT,
          newNode,
          oldNode,
        });
      }
    } else if ((oldNode as ParentNodeType).tagName !== newNode.tagName) {
      patches.push({
        type: PATCH_TYPE.REPLACE,
        newNode,
        oldNode,
      });
    } else {
      const pDiff: PropsDiff = this.diffProps(oldNode.props, newNode.props);

      if (pDiff.size) {
        patches.push({
          type: PATCH_TYPE.PROPS,
          newNode,
          oldNode,
          pDiff,
        });
      }

      this.diffChildren(oldNode as ParentNodeType, newNode, patches);
    }
  };

  diffChildren = (oldNode: ParentNodeType, newNode: ParentNodeType, patches: IPatch[]) => {
    const oChildren = oldNode.children;
    const nChildren = newNode.children;
    const maxLength = Math.max(oChildren.length, nChildren.length);

    for (let i = 0; i < maxLength; i += 1) {
      const oChild = oChildren[i];
      const nChild = nChildren[i];

      if (!nChild) {
        patches.push({
          type: PATCH_TYPE.DELETE,
          oldNode: oChild,
          newNode: nChild,
        });
      } else if (!oChild) {
        patches.push({
          type: PATCH_TYPE.ADD,
          oldNode: oChild,
          newNode: nChild,
          parent: oldNode,
        });
      } else {
        this.diff(oChild, nChild, patches);
      }
    }
  };

  diffProps = (oldProps: Props, newProps: Props) => {
    const diff: PropsDiff = new Map();

    for (const key in oldProps) {
      if (oldProps[key] !== newProps[key]) {
        diff.set(key, newProps[key]);
      }
    }

    for (const key in newProps) {
      if (oldProps[key] === undefined) {
        diff.set(key, newProps[key]);
      }
    }

    return diff;
  };

  update(patches: IPatch[]) {
    patches.forEach((patch) => {
      const { oldNode, newNode, type, pDiff, parent } = patch;
      if (type === PATCH_TYPE.REPLACE) {
        this.replace(oldNode, newNode);
      } else if (type === PATCH_TYPE.TEXT) {
        (oldNode as VTextNode).updateText((newNode as VTextNode).text);
        oldNode.domEl.textContent = (newNode as VTextNode).text;
      } else if (type === PATCH_TYPE.PROPS) {
        this.setProps(oldNode as ParentNodeType, newNode as ParentNodeType, pDiff);
      } else if (type === PATCH_TYPE.ADD) {
        const node = this.render(newNode);
        node.setParentNode(parent!);

        parent?.domEl.appendChild(node.domEl);
        parent?.children.push(node);
        parent?.children.forEach((child, index) => {
          child.keyIndex = index;
        });
      } else if (type === PATCH_TYPE.DELETE) {
        this.removeChild(oldNode);
      }
    });
  }

  replace(oldNode: VirtualNode, newNode: VirtualNode) {
    const { parent } = oldNode;

    const node = this.render(newNode);
    node.setParentNode(parent);
    node.keyIndex = oldNode.keyIndex;

    parent.children[oldNode.keyIndex] = node;
    parent.domEl.replaceChild(node.domEl, oldNode.domEl);

    this.unmount(oldNode);
  }

  removeChild(node: VirtualNode) {
    node.parent.domEl.removeChild(node.domEl);
    node.parent.children.splice(node.keyIndex, 1);
    node.parent.children.forEach((child, index) => {
      child.keyIndex = index;
    });
    this.unmount(node);
  }

  unmount = (node: VirtualNode) => {
    const callUnmount = (vnode: VirtualNode) => {
      if (!(vnode instanceof VTextNode)) {
        vnode.eventBus.emit(EVENTS.NU);
      }
    };

    BFS(node, callUnmount);
  };
}

const pixelDOM = new PixelDOM();

export { pixelDOM, NODE_TYPE };
