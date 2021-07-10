import { VCommonNode, VTextNode, VComponentNode, ITextNodeProps, IComponentOptions, INodeProps } from './Nodes';

export default class NodeFabric {
  createNode = (props: INodeProps) => new VCommonNode(props);

  createText = (props: ITextNodeProps) => new VTextNode(props);

  createComponent = (props: IComponentOptions) => new VComponentNode(props);
}
