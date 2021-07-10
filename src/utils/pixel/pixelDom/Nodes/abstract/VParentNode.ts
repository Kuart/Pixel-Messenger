import { ParentNodeType, VirtualNode } from '../nodes.type';
import { INode } from './node.type';
import { NODE_TYPE } from '../../const';
import { Attributes } from '../../../parser';
import { Props } from '../componentNode.type';
import { uuid } from '../../../../helpers';

export default abstract class VParentNode implements INode {
  type: NODE_TYPE;

  tagName: string;

  domEl: HTMLElement;

  parent: ParentNodeType;

  usedProps: Set<string> = new Set();

  attrs: Attributes;

  props: Props;

  keyIndex: number;

  key: string = uuid();

  children: VirtualNode[] = [];

  abstract setParentNode(parent: ParentNodeType): void;

  abstract setNewPixelStoreProps([field, value]: [string, any]): void;
}
