import PixelParser from './parser';
import { pixelDOM, ParentNodeType, IInitiatedComponent, VComponentNode, Methods, Props, State } from '../pixelDom';
import { IParentData } from './parser.type';
import { Pixel } from '../root';

export class ComponentParser {
  parserInstant: PixelParser;

  componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;

  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  constructor(parser: PixelParser) {
    this.parserInstant = parser;
  }

  parse(html: string, parentData?: IParentData): ParentNodeType | null {
    try {
      const { componentProps = {}, state = {}, methods = {} } = parentData || {};

      const [notCleanName, componentName] = html.match(this.componentNameRegExp)!;
      const componentConfig: IInitiatedComponent = Pixel.callComponentModel(componentName);

      if (componentConfig.components) {
        Pixel.registerComponents(componentConfig.components);
      }

      const componentParsedData = this.parserInstant.tagParser.parse(html.slice(notCleanName.length), {
        props: componentProps,
        state,
        methods,
      });

      if (!componentParsedData.isDisplay) {
        return null;
      }

      const component: VComponentNode = pixelDOM.nodeFabric.create(
        componentConfig,
        componentParsedData
      ) as VComponentNode;

      const componentParsedTag = this.parserInstant.parseHTML(componentConfig.template, {
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

  reParse(name: string, data?: Props, state?: State, methods?: Methods) {
    const componentConfig: IInitiatedComponent = Pixel.callComponentModel(name);

    componentConfig.state = state || componentConfig.state;

    const component: VComponentNode = pixelDOM.nodeFabric.create(componentConfig, data) as VComponentNode;

    const componentParsedTag = this.parserInstant.parseHTML(componentConfig.template, {
      componentProps: data || {},
      state: state || {},
      methods: this.bindMethods(componentConfig.methods || {}, component),
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
}
