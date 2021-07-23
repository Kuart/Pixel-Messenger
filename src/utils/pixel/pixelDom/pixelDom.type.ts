import { PATCH_TYPE } from './const';
import { ParentNodeType, VirtualNode } from './Nodes';

export type PropsDiff = Map<string, any>;

export interface IPatch {
  type: PATCH_TYPE;
  newNode: VirtualNode;
  oldNode: VirtualNode;
  pDiff?: PropsDiff;
  parent?: ParentNodeType;
}
