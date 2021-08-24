import PixelParser from './parser';
import { pixelDOM, ParentNodeType, IInitiatedComponent, VComponentNode, Methods, Props } from '../pixelDom';
import { IParentData, IParsedTag } from './parser.type';
import { Pixel } from '../root';

export class ComponentParser {
  parserInstance: PixelParser;

  componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;

  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  constructor(parser: PixelParser) {
    this.parserInstance = parser;
  }

  parse(html: string, parentData?: IParentData): ParentNodeType[] | ParentNodeType | null {
    try {
      const { componentProps = {}, state = {}, methods = {} } = parentData || {};

      const [notCleanName, componentName] = html.match(this.componentNameRegExp)!;
      const componentConfig: IInitiatedComponent = Pixel.callComponentModel(componentName);

      if (componentConfig.components) {
        Pixel.registerComponents(componentConfig.components);
      }

      const componentParsedData = this.parserInstance.tagParser.parse(html.slice(notCleanName.length), {
        props: componentProps,
        state,
        methods,
      });

      if (!componentParsedData.isDisplay) {
        return null;
      }

      if (componentParsedData.listProps) {
        return this.handleList(componentConfig, componentParsedData);
      }

      const component: VComponentNode = pixelDOM.nodeFabric.create(
        componentConfig,
        componentParsedData
      ) as VComponentNode;

      const componentParsedTag = this.parserInstance.parseHTML(componentConfig.template, {
        componentProps: componentParsedData.props || {},
        state: componentConfig.state || {},
        methods: this.bindMethods(componentConfig.methods || {}, component),
      });

      component.init(componentParsedTag);

      return component;
    } catch (error) {
      throw new Error(error);
    }
  }

  reParse(name: string, oldComponent: VComponentNode) {
    const componentConfig: IInitiatedComponent = Pixel.callComponentModel(name);

    componentConfig.state = oldComponent.state || componentConfig.state;

    const component: VComponentNode = pixelDOM.nodeFabric.create(componentConfig, {
      props: oldComponent.componentProps,
    } as any) as VComponentNode;

    const componentParsedTag = this.parserInstance.parseHTML(componentConfig.template, {
      componentProps: component.componentProps || {},
      state: componentConfig.state || {},
      methods: this.bindMethods(componentConfig.methods || {}, oldComponent),
    });

    component.init(componentParsedTag);

    return component;
  }

  bindMethods = (methods: Methods, self: VComponentNode) => {
    const methodsEntries = Object.entries(methods);
    return methodsEntries.reduce((acc: Methods, [key, value]: [string, Function]) => {
      acc[key] = value.bind(self);
      return acc;
    }, {});
  };

  handleList = (config: IInitiatedComponent, data: IParsedTag) => {
    const components = data.listProps.map(
      (item: Props) =>
        pixelDOM.nodeFabric.create(config, {
          ...data,
          props: { ...item, ...data.props },
          events: data.events,
        }) as VComponentNode
    );

    /* prettier-ignore */
    const componentsParsedTag = components.map((component: VComponentNode, index: number) =>
      this.parserInstance.parseHTML(config.template, {
        componentProps: { ...data.props, ...data.listProps[index] } || {},
        state: config.state || {},
        methods: this.bindMethods(config.methods || {}, component),
      }));

    componentsParsedTag.forEach((tagConfig: ParentNodeType, index: number) => {
      components[index].init(tagConfig);
    });

    return components;
  };
}
