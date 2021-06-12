import { PixelDOM } from './PixelDOM';
import { PixelParser } from './PixelParser';

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
    this.registerComponent(config.components);
    this.render(config.template);
  }

  registerComponent(components: { [key: string]: Function }): void {
    Object.keys(components).forEach((componentName: string) => {
      if (!this.components[componentName]) {
        this.components[componentName] = components[componentName];
      }
    });
  }

  render = (template: string) => {
    const VDOM = this.parser.parseHTML(template);
    this.pixelDOM.mount(VDOM, this.root);
    console.log(this.components);
  };
}

export { Pixel };
