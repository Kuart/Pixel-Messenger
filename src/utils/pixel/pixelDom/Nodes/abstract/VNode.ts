import { INode } from './node.type';
import { NODE_TYPE } from '../../const';
import { ParentNodeType } from '../nodes.type';
import { uuid } from '../../../../helpers';

export default abstract class VNode implements INode {
  type: NODE_TYPE;

  domEl: Text;

  usedProps: Set<string> = new Set();

  parent: ParentNodeType;

  keyIndex: number;

  key: string = uuid();

  abstract setParentNode(parent: ParentNodeType): void;

  abstract setNewPixelStoreProps([field, value]: [string, any]): void;
}
