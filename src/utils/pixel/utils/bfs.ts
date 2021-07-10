import { VTextNode, VirtualNode } from '../pixelDom';
import { Queue } from './structures';

export function BFS(root: VirtualNode, callback: Function, args?: unknown) {
  const queue = new Queue<VirtualNode>();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    callback(node, args);

    if (!(node instanceof VTextNode)) {
      for (let i = 0; i < node.children.length; i += 1) {
        queue.enqueue(node.children[i]);
      }
    }
  }
}

export function bfsFirstParents(root: VirtualNode, target: string) {
  const queue = new Queue<VirtualNode>();
  const found = [];
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    if (node.usedProps.has(target)) {
      found.push(node);
    } else if (!(node instanceof VTextNode)) {
      for (let i = 0; i < node.children.length; i += 1) {
        queue.enqueue(node.children[i]);
      }
    }
  }

  return found;
}
