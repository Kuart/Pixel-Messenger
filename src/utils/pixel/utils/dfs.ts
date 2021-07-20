import { ParentNodeType, VirtualNode, VTextNode } from '../pixelDom';
import { Stack } from './structures';

export const DFS = (root: ParentNodeType, callback: Function) => {
  const stack = new Stack<VirtualNode>();

  stack.push(root);

  while (!stack.isEmpty()) {
    const current = stack.pop();

    if (!(current instanceof VTextNode) && current.children.length) {
      callback(current, stack);
    }
  }
};
