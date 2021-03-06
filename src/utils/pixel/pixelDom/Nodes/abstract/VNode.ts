import { INode } from './node.type';
import { NODE_TYPE } from '../../const';
import { ParentNodeType } from '../nodes.type';
import { uuid } from '../../../../helpers';
import { Props } from '../componentNode.type';

export default abstract class VNode implements INode {
  type: NODE_TYPE;

  domEl: Text;

  props: Props;

  parent: ParentNodeType;

  keyIndex: number;

  key: string = uuid();

  abstract setParentNode(parent: ParentNodeType): void;
}
