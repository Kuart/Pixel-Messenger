interface IStackNode<T> {
  stack: T[];
}

interface IQueueNode<T> {
  prev: IQueueNode<T> | null;
  next: IQueueNode<T> | null;
  value: T;
}

export { IStackNode, IQueueNode };
