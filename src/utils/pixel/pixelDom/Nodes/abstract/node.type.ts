import { ParentNodeType } from '../nodes.type';
import { NODE_TYPE } from '../../const';

export interface INode {
  type: NODE_TYPE;
  domEl: HTMLElement | Text;
  parent: ParentNodeType;
  key: string;
  setParentNode(parent: ParentNodeType): void;
  setNewPixelStoreProps([field, value]: [string, any]): void;
}
