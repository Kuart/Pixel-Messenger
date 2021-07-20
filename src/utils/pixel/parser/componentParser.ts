import { Parser } from '.';
import { pixelDOM, ParentNodeType, IInitiatedComponent, VComponentNode } from '../pixelDom';

export class ComponentParser {
  parserInstant: Parser;

  componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;

  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse(html: string, parentData?: VComponentNode): ParentNodeType {
    try {
      const { componentProps = {}, state = {}, methods = {} } = parentData || {};

      const [notCleanName, componentName] = html.match(this.componentNameRegExp)!;
      const componentConfig: IInitiatedComponent = this.parserInstant.instance.callComponentModel(componentName);

      const [firstTag, ...tags] = componentConfig.template.match(this.tagRegExp)!;
      const start = firstTag.length;
      const end = componentConfig.template.trim().length - tags[tags.length - 1].length;

      if (componentConfig.components) {
        this.parserInstant.instance.registerComponents(componentConfig.components);
      }

      const componentParsedData = this.parserInstant.tagParser.parse(html.slice(notCleanName.length), {
        props: componentProps,
        state,
        methods,
      });

      const componentParsedTag = this.parserInstant.tagParser.parse(firstTag, {
        props: componentParsedData.props || {},
        state: componentConfig.state || {},
        methods: componentConfig.methods || {},
      });

      const component: VComponentNode = pixelDOM.nodeFabric.create(
        componentConfig,
        componentParsedData,
        componentParsedTag
      ) as VComponentNode;

      const subTree = this.parserInstant.parseHTML(componentConfig.template.trim().slice(start, end), component);

      return subTree;
    } catch (error) {
      throw new Error(error);
    }
  }
}
