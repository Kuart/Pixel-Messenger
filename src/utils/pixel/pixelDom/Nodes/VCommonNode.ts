import { NODE_TYPE } from '../const';
import { INodeProps, ParentNodeType } from './nodes.type';
import { Methods, Props } from './componentNode.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';
import { createProxyObject } from '../../utils';

export class VCommonNode extends VParentNode {
  type = NODE_TYPE.COMMON_NODE;

  tagName: string;

  propHandlers: Methods | null;

  constructor(props: INodeProps) {
    super();

    const { tagName, attrs, handlers = null } = props;

    this.attrs = attrs;
    this.tagName = tagName;
    this.propHandlers = handlers;
    this.props = createProxyObject({}, this.update);
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }

  setNewPixelStoreProps([field, value]: IPixelStoreUpdateProp) {
    this.props[field] = value;
  }

  update = (up: any) => {
    console.warn('node update', up);
  };

  redraw = () => {
    console.log(this.parent);
  };
}
