import PixelParser from './pixelParser';
import PixelRouter from './pixelRouter';

export interface IPixelInstance {
  el: string;
  template: string;
  data?: any;
  methods?: any;
  routes?: Record<string, string>;
}
export interface IPixelComponent {
  template?: string;
  data?: any;
  methods?: any;
  props?: any;
}

class Pixel {
  private target: string;

  private parser: PixelParser;

  private router: PixelRouter;

  constructor(config: IPixelInstance) {
    this.target = config.el;
    this.parser = new PixelParser(config.template);
    this.router = new PixelRouter();
  }

  componens: Record<string, IPixelComponent> = {};

  component(componentName: string, instance: IPixelComponent): void {
    if (componentName) {
      throw Error('this component name is already used');
    }

    this.componens[componentName] = instance;
  }
}

export default Pixel;
