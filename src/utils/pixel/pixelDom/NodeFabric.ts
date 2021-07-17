import { IParsedTag } from '../parser';
import {
  VCommonNode,
  VTextNode,
  VComponentNode,
  ITextNodeProps,
  IComponentOptions,
  INodeProps,
  IInitiatedComponent,
} from './Nodes';

export default class NodeFabric {
  createNode = (props: INodeProps) => new VCommonNode(props);

  createText = (props: ITextNodeProps) => new VTextNode(props);

  createComponent = (componentParsed: IParsedTag, tagParsed: IParsedTag, componentConfig: IInitiatedComponent) => {
    const props: IComponentOptions = {
      tagName: tagParsed.tagName,
      props: tagParsed.props,
      componentProps: componentParsed.props,
      state: componentConfig.state,
      methods: componentConfig.methods,
      name: componentConfig.name,
      componentDidMount: componentConfig.componentDidMount,
    };

    return new VComponentNode(props);
  };
}
