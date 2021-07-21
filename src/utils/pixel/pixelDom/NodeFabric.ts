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
  public create(config: IInitiatedComponent | INodeProps | ITextNodeProps, componentParsed?: IParsedTag) {
    if ('name' in config) {
      return this.createComponent(config, componentParsed!);
    }

    if ('tagName' in config) {
      return this.createNode(config);
    }

    return this.createText(config);
  }

  private createNode = (props: INodeProps): VCommonNode => new VCommonNode(props);

  private createText = (props: ITextNodeProps): VTextNode => new VTextNode(props);

  private createComponent = (componentConfig: IInitiatedComponent, parsed: IParsedTag): VComponentNode => {
    const props: IComponentOptions = {
      componentProps: parsed.props,
      state: componentConfig.state,
      name: componentConfig.name,
      componentDidMount: componentConfig.componentDidMount,
    };

    return new VComponentNode(props);
  };
}
