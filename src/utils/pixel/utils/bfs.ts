import { Component } from '../component';
import { NODE_TYPE, VirtualNode } from '../pixelDom';
import { Queue } from './structures';

export function BFS(root: VirtualNode, callback: Function) {
  const queue = new Queue<VirtualNode>();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    callback(node);

    if (node.type !== NODE_TYPE.TEXT_NODE) {
      const children = (node as Component).children.length ? (node as Component).children : [];

      for (let i = 0; i < children.length; i += 1) {
        queue.enqueue(children[i]);
      }
    }
  }
}
