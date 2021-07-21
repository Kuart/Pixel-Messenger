import { NODE_TYPE } from '../const';
import { ParentNodeType, INodeProps } from './nodes.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';
import { createProxyObject } from '../../utils';
import { EVENTS } from '../../../const';

export class VCommonNode extends VParentNode {
  type = NODE_TYPE.COMMON_NODE;

  tagName: string;

  constructor({ props, tagName, events }: INodeProps) {
    super();

    this.tagName = tagName;
    this.eventHandlers = events;
    this.props = createProxyObject(props, this.update);
    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(EVENTS.NWM, this.nodeWillMount.bind(this));
    this.eventBus.on(EVENTS.NU, this.nodeUnmount.bind(this));
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
