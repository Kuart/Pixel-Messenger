export default class Stack<T> {
  static ERRORS = {
    EMPTY_POP: `Can't pop, stack is empty`,
  };

  private stack: T[];

  constructor() {
    this.stack = [];
  }

  push(value: T) {
    this.stack.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw Error(Stack.ERRORS.EMPTY_POP);
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
