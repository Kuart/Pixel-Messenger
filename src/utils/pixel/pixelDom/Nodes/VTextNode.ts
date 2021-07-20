import { NODE_TYPE } from '../const';
import { ITextNodeProps, ParentNodeType } from './nodes.type';
import { VNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';
import { createProxyObject } from '../../utils';

export class VTextNode extends VNode {
  type = NODE_TYPE.TEXT_NODE;

  text: string;

  constructor(config: ITextNodeProps) {
    super();
    const { text, props } = config;

    if (props) {
      Object.keys(props).forEach((key: string) => {
        this.text = props[key];
      });

      this.props = createProxyObject(props, this.nodeUpdate);
    } else {
      this.text = text;
    }
  }

  nodeUpdate(a: any) {
    console.log(a);
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }

  setNewPixelStoreProps([_, value]: IPixelStoreUpdateProp) {
    this.domEl.textContent = value;
  }
}
