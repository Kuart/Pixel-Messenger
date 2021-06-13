export default interface IStackNode<T> {
  next: IStackNode<T> | null;
  prev: IStackNode<T> | null;
  value: T;
}
