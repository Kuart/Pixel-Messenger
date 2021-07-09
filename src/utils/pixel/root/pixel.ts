import { Parser } from '../parser';
import { VElement, VirtualNode } from '../pixelDom';
import { IRoutesConfig, Router } from '../router';
import { Component, IComponentModel, State } from '../component';
import { COMPONENT_EVENTS } from '../../const';
import { BFS } from '../utils';
import { Store } from '../store';

export interface IPixelInstance {
  el: string;
  template?: string;
  routerConfig?: IRoutesConfig;
  state?: State;
  components?: Record<string, Function>;
}

class Pixel {
  static ERROR = {
    ROOT_NF: (selector: string) => `Root element ${selector} is not found`,
    ROOT_DOM_NF: (tagName: string) => `Root dom element ${tagName} has not created valid dom node`,
    VDOM_NF: 'Failed to build VDOM',
    PIXEL_ISALRE: 'Failed to build VDOM',
    INITIATED: 'Pixel already in use',
  };

  static CONST = {
    CDM: COMPONENT_EVENTS.CDM,
    CU: COMPONENT_EVENTS.CU,
  };

  protected static instance: Pixel;

  public router: Router;

  public store: Store;

  private root: Element;

  private parser: Parser;

  private VDOM: Component | VElement;

  public components: Record<string, Function> = {};

  protected isInitiated: boolean = false;

  public initiatedComponents: Record<string, IComponentModel> = {};

  constructor() {
    if (Pixel.instance) {
      return Pixel.instance;
    }

    this.parser = new Parser(this);
    this.router = new Router(this);
    this.store = new Store(this);

    Pixel.instance = this;
  }

  config(config: IPixelInstance) {
    if (this.isInitiated) {
      throw new Error(Pixel.ERROR.INITIATED);
    }

    this.setRootEl(config.el);
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

  setRootEl = (selector: string) => {
    try {
      const root = document.querySelector(selector);
      if (!root) {
        throw Error(Pixel.ERROR.ROOT_NF(selector));
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
        this.unmount(this.VDOM);
      }

      this.VDOM = this.parser.parseHTML(template);

      if (!this.VDOM) {
        throw Error(Pixel.ERROR.VDOM_NF);
      }

      this.mount(this.VDOM);
    } catch (error) {
      console.error(error);
    }
  };

  mount = (VDOM: Component | VElement) => {
    try {
      if (!VDOM.domEl) {
        throw Error(Pixel.ERROR.ROOT_DOM_NF(VDOM.tagName));
      }
      if (this.root.childNodes.length) {
        this.root.replaceChild(VDOM.domEl, this.root.childNodes[0]);
      } else {
        this.root.appendChild(VDOM.domEl);
      }

      this.didMount();
    } catch (error) {
      console.error(error);
    }
  };

  didMount() {
    const callCDM = (node: VirtualNode) => {
      if (node instanceof Component) {
        node.eventBus.emit(Pixel.CONST.CDM);
      }
    };

    BFS(this.VDOM, callCDM);
  }

  /* !TODO */
  unmount = (VDOM: VirtualNode) => {
    const callUnmount = (node: VirtualNode) => {
      if (node instanceof Component) {
        node.eventBus.emit(Pixel.CONST.CU);
      }
    };

    BFS(VDOM, callUnmount);
  };
}

const PixelRoot = new Pixel();

export default PixelRoot;

export const PixelRouter = PixelRoot.router;
export const PixelStore = PixelRoot.store;
