import { NODE_TYPE } from '../const';
import { ITextNodeProps, ParentNodeType } from './nodes.type';
import { VNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';

export class VTextNode extends VNode {
  type = NODE_TYPE.TEXT_NODE;

  text: string;

  constructor(props: ITextNodeProps) {
    super();
    const { text } = props;

    this.text = text;
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }

  setNewPixelStoreProps([_, value]: IPixelStoreUpdateProp) {
    this.domEl.textContent = value;
  }
}
