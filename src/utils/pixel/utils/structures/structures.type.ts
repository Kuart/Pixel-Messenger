export interface IStackNode<T> {
  stack: T[];
}

export interface IQueueNode<T> {
  prev: IQueueNode<T> | null;
  next: IQueueNode<T> | null;
  value: T;
}
