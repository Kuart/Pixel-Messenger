import { Parser } from '../parser';
import { VElement } from '../pixelDom';
import { IRoutesConfig, Router } from '../router';
import { Component, IComponentModel, State } from '../utils/Component';

export interface IPixelInstance {
  el: string;
  template?: string;
  routes?: IRoutesConfig;
  state?: State;
  components?: Record<string, Function>;
}

class Pixel {
  static ERROR = {
    ROOT_NF: (selector: string) => `Root element ${selector} is not found`,
    ROOT_DOM_NF: (tagName: string) => `Root dom element ${tagName} has not created valid dom node`,
    VDOM_NF: 'Failed to build VDOM',
  };

  private root: Element;

  private parser: Parser;

  private router: Router;

  private VDOM: Component | VElement;

  public components: Record<string, Function> = {};

  public initiatedComponents: Record<string, IComponentModel> = {};

  constructor(config: IPixelInstance) {
    this.parser = new Parser(this);
    this.router = new Router(this);

    this.setRootEl(config.el);
    this.registerComponents(config.components);
    this.init(config.routes, config.template);
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

  init = (routes: IRoutesConfig | null = null, template: string | null = null) => {
    if (routes) {
      this.router.setRoutes(routes.default, routes.routes);
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
    } catch (error) {
      console.log(error);
    }
  };

  unmount = (VDOM: Component | VElement) => {
    console.log(VDOM);
  };
}

export default Pixel;
