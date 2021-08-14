import { NODE_TYPE } from '../const';
import { ITextNodeProps, ParentNodeType } from './nodes.type';
import { VNode } from './abstract';

export class VTextNode extends VNode {
  type = NODE_TYPE.TEXT_NODE;

  text: string;

  propsKey: string;

  constructor(config: ITextNodeProps) {
    super();
    const { text, props } = config;

    if (props) {
      Object.keys(props).forEach((key: string) => {
        this.text = props[key];
        this.propsKey = key;
      });

      this.props = props;
    } else {
      this.text = text;
    }
  }

  updateText(text: string = '') {
    this.text = text;

    if (this.propsKey) {
      this.props[this.propsKey] = text;
    }
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }
}
