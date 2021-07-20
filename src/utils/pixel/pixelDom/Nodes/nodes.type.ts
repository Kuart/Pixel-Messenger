import { Methods, State, Props } from './componentNode.type';
import { VTextNode } from './VTextNode';
import { VCommonNode } from './VCommonNode';
import { VComponentNode } from './VComponentNode';

interface INodeProps {
  tagName: string;
  props: Props;
}

interface ITextNodeProps {
  text: string;
  props?: Record<string, string>;
}

interface IComponent {
  state: State;
  methods: Methods;
  componentProps: Props;
  componentDidMount?: Function;
  pixelStore?: Record<string, any>;
}

interface IComponentOptions extends Omit<IComponent, 'methods'> {
  tagName: string;
  name: string;
  props: Props;
  methods: Methods;
}

/* eslint no-use-before-define: 0 */

type VirtualNode = VTextNode | VCommonNode | VComponentNode;
type ParentNodeType = VComponentNode | VCommonNode;

export { VirtualNode, ParentNodeType };
export { INodeProps, ITextNodeProps, IComponent, IComponentOptions };
