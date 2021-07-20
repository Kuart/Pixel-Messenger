import { ParentNodeType } from '../nodes.type';
import { NODE_TYPE } from '../../const';
import { Props } from '../componentNode.type';

export interface INode {
  type: NODE_TYPE;
  props: Props;
  domEl: HTMLElement | Text;
  parent: ParentNodeType;
  key: string;
  setParentNode(parent: ParentNodeType): void;
  setNewPixelStoreProps([field, value]: [string, any]): void;
}
