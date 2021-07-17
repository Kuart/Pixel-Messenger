import { Parser } from '.';
import { Props, State, Methods, pixelDOM, IComponentModel, IInitiatedComponent } from '../pixelDom';

export class ComponentParser {
  parserInstant: Parser;

  componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;

  tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse(html: string, props: Props = {}, parentState: State = {}, parentMethods: Methods = {}) {
    const [notCleanName, componentName] = html.match(this.componentNameRegExp)!;
    const componentConfig: IInitiatedComponent = this.parserInstant.instance.callComponentModel(componentName);

    const [firstTag, ...tags] = componentConfig.template.match(this.tagRegExp);
    const start = firstTag.length;
    const end = componentConfig.template.trim().length - tags[tags.length - 1].length;

    if (componentConfig.components) {
      this.parserInstant.instance.registerComponents(componentConfig.components);
    }

    const componentParsedData = this.parserInstant.tagParser.parse(html.slice(notCleanName.length), {
      props,
      state: parentState,
      methods: parentMethods,
    });

    const componentParsedTag = this.parserInstant.tagParser.parse(firstTag, {
      props: componentParsedData.props,
      state: componentConfig.state || {},
      methods: componentConfig.methods || {},
    });

    const component = pixelDOM.nodeFabric.createComponent(componentParsedData, componentParsedTag, componentConfig);

    console.log(component);
  }
}

/* return this.parseHTML(`${template.trim().substring(start, end)}`, component); */
