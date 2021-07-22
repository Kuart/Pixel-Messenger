import { Methods, State, Props, EventHandler } from './componentNode.type';
import { VTextNode } from './VTextNode';
import { VCommonNode } from './VCommonNode';
import { VComponentNode } from './VComponentNode';

interface INodeProps {
  tagName: string;
  props: Props;
  events: EventHandler;
}

interface ITextNodeProps {
  text: string;
  props?: Record<string, string>;
}

interface IComponent {
  state: State;
  componentProps: Props;
  componentDidMount?: Function;
  pixelStore?: Record<string, any>;
}

interface IComponentOptions extends Omit<IComponent, 'methods'> {
  name: string;
  methods: Methods;
}
interface IInitOptions {
  tagName: string;
  props: Props;
  events: EventHandler;
  children?: VirtualNode[];
}

/* eslint no-use-before-define: 0 */

type VirtualNode = VTextNode | VCommonNode | VComponentNode;
type ParentNodeType = VComponentNode | VCommonNode;

export { VirtualNode, ParentNodeType };
export { INodeProps, ITextNodeProps, IComponent, IComponentOptions, IInitOptions };
