import { Pixel } from '..';
import EventBus from '../utils/EventBus';
import { IRouterState, IDefaultRoute, IRoutes } from './router.state';

class Router {
  static ERRORS: Record<string, string> = {
    NO_DEF_CONF: 'Router default config not found',
    NO_DEF_ROUTES: 'Router default path not found',
    WRONG_DEF_COMP: 'Router default component has not found',
    NO_ROUTES: 'Path has not been added to the router',
    WRONG_COMP: 'Router has not found required component',
  };

  static EVENTS: Record<string, string> = {
    INIT: 'init',
    UPDATE: 'update',
  };

  instant: Pixel;

  eventBus: EventBus;

  defaultRoute: IDefaultRoute;

  routes: IRoutes;

  state: IRouterState;

  urlListener: any;

  constructor(instant: Pixel) {
    this.instant = instant;
    this.eventBus = new EventBus();
    this.state = this.createState({ currentRoute: '' });

    this.registerEvent();
  }

  registerEvent = () => {
    this.eventBus.on(Router.EVENTS.INIT, this.initRouting);
    this.eventBus.on(Router.EVENTS.UPDATE, this.changeLayout);
  };

  setRoutes(defaultRoute: IDefaultRoute, routes?: IRoutes) {
    try {
      if (!defaultRoute) {
        throw Error(Router.ERRORS.NO_DEF_CONF);
      }

      if (!defaultRoute.path) {
        throw Error(Router.ERRORS.NO_DEF_ROUTES);
      }

      if (!this.instant.components[defaultRoute.component]) {
        throw Error(Router.ERRORS.WRONG_DEF_COMP);
      }

      if (!routes) {
        throw Error(Router.ERRORS.NO_ROUTES);
      }

      Object.keys(routes).forEach((key) => {
        if (!routes[key] || !this.instant.components[routes[key]]) {
          throw Error(Router.ERRORS.WRONG_COMP);
        }
      });

      this.defaultRoute = defaultRoute;
      this.routes = { ...routes, [defaultRoute.path]: defaultRoute.component };
      this.eventBus.emit(Router.EVENTS.INIT);
    } catch (error) {
      console.error(error);
    }
  }

  createState = (state: IRouterState) => {
    const handler = {
      set: (target: IRouterState, prop: keyof IRouterState, value: string) => {
        target[prop] = value;
        this.eventBus.emit(Router.EVENTS.UPDATE, value);
        return true;
      },
    };

    return new Proxy(state, handler);
  };

  initRouting = () => {
    window.onhashchange = (event: HashChangeEvent) => {
      const target = event.currentTarget as Window;
      this.checkHash(target);
    };

    this.checkHash(window);
  };

  checkHash = (target: Window) => {
    let currentRout = target.location.hash.slice(1);
    if (!currentRout) {
      currentRout = this.defaultRoute.path;
    } else if (!this.routes[currentRout]) {
      currentRout = 'wrong';
    }

    this.state.currentRoute = this.routes[currentRout];
  };

  changeLayout = (componentName: string) => {
    this.instant.render(`<${componentName}/>`);
  };
}

export default Router;
