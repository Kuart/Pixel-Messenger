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
  public create(
    config: IInitiatedComponent | INodeProps | ITextNodeProps,
    componentParsed?: IParsedTag,
    componentParsedTag?: IParsedTag
  ) {
    if ('name' in config) {
      return this.createComponent(config, componentParsed!, componentParsedTag!);
    }

    if ('tagName' in config) {
      return this.createNode(config);
    }

    return this.createText(config);
  }

  private createNode = (props: INodeProps): VCommonNode => new VCommonNode(props);

  private createText = (props: ITextNodeProps): VTextNode => new VTextNode(props);

  private createComponent = (
    componentConfig: IInitiatedComponent,
    parsed: IParsedTag,
    parsedTag: IParsedTag
  ): VComponentNode => {
    const props: IComponentOptions = {
      tagName: parsedTag.tagName,
      props: parsedTag.props,
      componentProps: parsed.props,
      state: componentConfig.state,
      methods: componentConfig.methods,
      name: componentConfig.name,
      componentDidMount: componentConfig.componentDidMount,
    };

    return new VComponentNode(props);
  };
}
