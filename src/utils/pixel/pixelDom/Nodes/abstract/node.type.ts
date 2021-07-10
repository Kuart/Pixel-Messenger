import { ParentNodeType } from '../nodes.type';
import { NODE_TYPE } from '../../const';

export interface INode {
  type: NODE_TYPE;
  domEl: HTMLElement | Text;
  parent: ParentNodeType;
  usedProps: Set<string>;
  key: string;
  keyIndex: number;
  setParentNode(parent: ParentNodeType): void;
  setNewPixelStoreProps([field, value]: [string, any]): void;
}
