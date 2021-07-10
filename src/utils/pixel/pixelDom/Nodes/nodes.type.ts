import { Attributes, Parser } from '../../parser';
import { Methods, State, Props } from './componentNode.type';
import { VTextNode } from './VTextNode';
import { VCommonNode } from './VCommonNode';
import { VComponentNode } from './VComponentNode';

interface INodeProps {
  tagName: string;
  attrs: Attributes;
  handlers: Methods | undefined;
}

interface ITextNodeProps {
  text: string;
}

interface IComponent {
  template: string;
  state?: State;
  methods?: Record<string, Function>;
  componentDidMount?: Function;
  pixelStore?: Record<string, any>;
}

interface IComponentOptions extends Omit<IComponent, 'methods' | 'usedProps'> {
  tagName: string;
  usedProps: Set<string>;
  componentName: string;
  parserInstant: Parser;
  props?: Props;
  attrs?: Attributes;
  propHandlers?: Methods;
  methods?: Methods;
}

/* eslint no-use-before-define: 0 */

type VirtualNode = VTextNode | VCommonNode | VComponentNode;
type ParentNodeType = VComponentNode | VCommonNode;

export { VirtualNode, ParentNodeType };
export { INodeProps, ITextNodeProps, IComponent, IComponentOptions };
