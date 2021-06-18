export default class Stack<T> {
  private stack: T[] = [];

  push(value: T) {
    this.stack.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw Error();
    }

    return this.stack.pop() as T;
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}
