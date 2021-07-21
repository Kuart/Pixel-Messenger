import { Parser } from '.';
import { pixelDOM, ParentNodeType, IInitiatedComponent, VComponentNode, Methods } from '../pixelDom';
import { IParentData } from './parser.type';

export class ComponentParser {
  parserInstant: Parser;

  componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;

  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse(html: string, parentData?: IParentData): ParentNodeType {
    try {
      const { componentProps = {}, state = {}, methods = {} } = parentData || {};

      const [notCleanName, componentName] = html.match(this.componentNameRegExp)!;
      const componentConfig: IInitiatedComponent = this.parserInstant.instance.callComponentModel(componentName);

      if (componentConfig.components) {
        this.parserInstant.instance.registerComponents(componentConfig.components);
      }

      const componentParsedData = this.parserInstant.tagParser.parse(html.slice(notCleanName.length), {
        props: componentProps,
        state,
        methods,
      });

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

  bindMethods = (methods: Methods, self: VComponentNode) =>
    Object.entries(methods).reduce((acc: Methods, [key, value]: [string, Function]) => {
      acc[key] = value.bind(self);
      return acc;
    }, {});
}
