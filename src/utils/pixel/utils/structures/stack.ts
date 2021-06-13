import IStackNode from './stack.type';

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
      if (this.tail.prev) {
        this.tail = this.tail.prev;
      } else {
        this.tail = null;
        this.head = null;
      }
      this.size -= 1;
    }
    return local ? local.value : null;
  }

  peek() {
    return this.tail;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
