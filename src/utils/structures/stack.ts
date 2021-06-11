import { IStackNode } from './stack.type';

export default class Stack<T> {
  private size: number;

  private head: IStackNode<T>;

  private tail: IStackNode<T>;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  push(value: T) {
    const node: IStackNode<T> = { value, next: null, prev: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size += 1;
  }

  pop(): T | null {
    const local = this.tail;
    if (this.size) {
      this.tail = this.tail.prev;
      this.size -= 1;
    }
    return local ? local.value : null;
  }

  peek() {
    return this.tail;
  }

  isLast(): boolean {
    return this.size === 1;
  }
}
