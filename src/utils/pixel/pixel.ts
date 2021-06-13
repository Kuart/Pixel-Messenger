import { PixelParser } from './parser';
import { PixelDOM } from './pixelDom';

export interface IPixelComponent {
  template?: string;
  data?: any;
  methods?: any;
  props?: any;
}

export interface IPixelInstance {
  el: string;
  template: string;
  data?: any;
  routes?: Record<string, string>;
  components?: Record<string, Function>;
}

class Pixel {
  private root: Element;

  private parser: PixelParser;

  private pixelDOM: PixelDOM;

  public components: Record<string, Function> = {};

  public initiatedComponents: Record<string, IPixelComponent> = {};

  constructor(config: IPixelInstance) {
    this.parser = new PixelParser(this);
    this.pixelDOM = new PixelDOM();

    this.root = document.querySelector(config.el);
    this.registerComponents(config.components);
    this.render(config.template);
  }

  registerComponents(components: { [key: string]: Function }): void {
    Object.keys(components).forEach((componentName: string) => {
      if (!this.components[componentName]) {
        this.components[componentName] = components[componentName];
      }
    });
  }

  render = (template: string) => {
    const VDOM = this.parser.parseHTML(template);
    console.log(VDOM);
    if (this.root.childNodes.length) {
      this.root.replaceWith(VDOM.domEl);
    } else {
      this.root.appendChild(VDOM.domEl);
    }
  };
}

export { Pixel };
