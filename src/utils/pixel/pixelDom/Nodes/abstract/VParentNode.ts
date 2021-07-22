import { ParentNodeType, VirtualNode } from '../nodes.type';
import { INode } from './node.type';
import { NODE_TYPE } from '../../const';
import { EventHandler, Props } from '../componentNode.type';
import { uuid } from '../../../../helpers';
import { EventBus } from '../../../utils';

export default abstract class VParentNode implements INode {
  domEl: HTMLElement;

  type: NODE_TYPE;

  tagName: string;

  eventBus: EventBus = new EventBus();

  eventHandlers: EventHandler;

  parent: ParentNodeType;

  children: VirtualNode[] = [];

  keyIndex: number;

  key: string = uuid();

  props: Props;

  nodeDidMount(callback?: Function) {
    if (this.eventHandlers.size) {
      this.eventHandlers.forEach((value: Function, key: string) => {
        this.domEl.addEventListener(key, value as any, true);
      });
    }

    if (callback) {
      callback();
    }
  }

  nodeUnmount() {
    if (this.eventHandlers.size) {
      this.eventHandlers.forEach((value: Function, key: string) => {
        this.domEl.removeEventListener(key, value as any, true);
      });
    }
  }

  abstract setParentNode(parent: ParentNodeType): void;

  abstract setNewPixelStoreProps([field, value]: [string, any]): void;
}
