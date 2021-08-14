import { Parser } from '../parser';
import { ParentNodeType, IComponentModel, pixelDOM } from '../pixelDom';
import { IRoutesConfig, Router } from '../router';
import { EVENTS } from '../../const';
import { Store } from '../store';

export interface IPixelInstance {
  el: string;
  template?: string;
  routerConfig?: IRoutesConfig;
  store?: Record<string, any>;
  components?: Record<string, Function>;
}

export class Pixel {
  static ERROR = {
    ROOT_NF: (selector: string) => `Root element ${selector} is not found`,
    ROOT_DOM_NF: (tagName: string) => `Root dom element ${tagName} has not created valid dom node`,
    VDOM_NF: 'Failed to build VDOM',
    PIXEL_ISALRE: 'Failed to build VDOM',
    INITIATED: 'Pixel already in use',
    FRONG_COMPONENT: (name: string) => `Component "${name}" is not registered`,
  };

  static CONST = {
    CDM: EVENTS.NDM,
  };

  protected static instance: Pixel;

  public router: Router;

  public store: Store;

  public root: Element;

  private VDOM: ParentNodeType;

  public components: Record<string, Function> = {};

  protected isInitiated: boolean = false;

  public initiatedComponents: Record<string, IComponentModel> = {};

  constructor() {
    this.router = new Router(this);
    this.store = new Store(this);
  }

  config(config: IPixelInstance) {
    if (this.isInitiated) {
      throw new Error(Pixel.ERROR.INITIATED);
    }

    this.setRootEl(config.el);
    this.store.init(config.store);
    this.registerComponents(config.components);
    this.init(config.routerConfig, config.template);
    this.isInitiated = true;
  }

  registerComponents(components: { [key: string]: Function } | undefined): void {
    if (components) {
      Object.keys(components).forEach((componentName: string) => {
        if (!this.components[componentName]) {
          this.components[componentName] = components[componentName];
        }
      });
    }
  }

  callComponentModel(componentName: string) {
    if (this.components[componentName]) {
      const componentModel = this.components[componentName]();
      componentModel.name = componentName;
      return componentModel;
    }

    throw Error(Pixel.ERROR.FRONG_COMPONENT(componentName));
  }

  setRootEl = (selector: string) => {
    try {
      const root = document.querySelector(selector);
      if (!root) {
        throw new Error(Pixel.ERROR.ROOT_NF(selector));
      } else {
        this.root = root;
      }
    } catch (err) {
      console.error(err);
    }
  };

  init = (routerConfig: IRoutesConfig | null = null, template: string | null = null) => {
    if (routerConfig) {
      this.router.setRoutes(routerConfig);
    } else if (template) {
      this.render(template);
    }
  };

  render = (template: string) => {
    try {
      if (this.VDOM) {
        pixelDOM.unmount(this.VDOM);
      }

      this.VDOM = Parser.parseHTML(template);

      if (!this.VDOM) {
        throw Error(Pixel.ERROR.VDOM_NF);
      }

      this.mount(this.VDOM);
    } catch (error) {
      console.error(error);
    }
  };

  mount = (VDOM: ParentNodeType) => {
    try {
      pixelDOM.render(VDOM);

      if (!VDOM.domEl) {
        throw Error(Pixel.ERROR.ROOT_DOM_NF(VDOM.tagName));
      }

      if (this.root.childNodes.length) {
        this.root.replaceChild(VDOM.domEl, this.root.childNodes[0]);
      } else {
        this.root.appendChild(VDOM.domEl);
      }
    } catch (error) {
      console.error(error);
    }
  };
}

const PixelRoot = new Pixel();

export default PixelRoot;

export const PixelRouter = PixelRoot.router;
export const PixelStore = PixelRoot.store;
