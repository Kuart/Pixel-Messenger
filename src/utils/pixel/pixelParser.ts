interface PixelElement {
  [key: string]: any;
}
interface PixelNode {
  [key: string]: any;
}

class PixelParser {
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  parseHTML() {
    console.log(this.template);
  }

  createElement(tag: string, props: Record<string, string | number | boolean>, children: PixelElement[]): PixelNode {
    const childrenElements = children.map((item) => this.createElement(item.tag, item.props, item.children));
    return {
      tag,
      props,
      childrenElements,
    };
  }

  /* !replace any */
  render(element: any, parent: any): void {
    /* global window */
    const domEl = window.document.createElement(element);
    parent.appEndChild(domEl);
    console.log(this.template);
  }
}

export default PixelParser;
