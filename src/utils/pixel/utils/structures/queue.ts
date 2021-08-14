import { IQueueNode } from './structures.type';

export class Queue<T> {
  static ERRORS = {
    EMPTY_DEQUEUE: "Can't dequeue, queue is empty",
  };

  size: number;

  head: IQueueNode<T> | null;

  tail: IQueueNode<T> | null;

  constructor() {
    this.size = 0;

    this.head = null;
    this.tail = null;
  }

  enqueue(value: T) {
    const node: IQueueNode<T> = { value, next: null, prev: null };

    node.prev = this.tail;

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error(Queue.ERRORS.EMPTY_DEQUEUE);
    }

    const node = this.head;
    const nextNode = node!.next;

    if (nextNode) {
      node!.next = null;
      nextNode.prev = null;
    }

    this.head = nextNode;

    if (this.tail === node) {
      this.tail = nextNode;
    }

    this.size -= 1;

    return node!.value;
  }

  peek() {
    return this.head;
  }

  isEmpty() {
    return this.head === null;
  }
}
