import { Pixel } from '..';
import { IDefaultRoute, IRoutes, IRoutesConfig } from './router.state';

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

  static instantce: Router;

  private pixelInstantce: typeof Pixel;

  public defaultRoute: IDefaultRoute;

  public routes: IRoutes;

  private history: History;

  private isAuth: boolean = true;

  private permittedRoutes: string[];

  private redirectPage: string;

  constructor(pixelInstantce?: typeof Pixel) {
    if (Router.instantce) {
      return Router.instantce;
    }

    if (pixelInstantce) {
      this.pixelInstantce = pixelInstantce;
      this.history = window.history;
    }

    Router.instantce = this;
  }

  public handleAuthChange(isAuth: boolean) {
    if (!isAuth) {
      this.checkRouteAuth();
    }
  }

  public async setRoutes(routesConfig: IRoutesConfig) {
    const { routes, defaultRoute, auth } = routesConfig;

    try {
      if (!defaultRoute) {
        throw Error(Router.ERRORS.NO_DEF_CONF);
      }

      if (!defaultRoute.path) {
        throw Error(Router.ERRORS.NO_DEF_ROUTES);
      }

      if (!this.pixelInstantce.components[defaultRoute.component]) {
        throw Error(Router.ERRORS.WRONG_DEF_COMP);
      }

      if (!routes) {
        throw Error(Router.ERRORS.NO_ROUTES);
      }

      Object.keys(routes).forEach((key) => {
        if (!routes[key] || !this.pixelInstantce.components[routes[key].component]) {
          throw Error(Router.ERRORS.WRONG_COMP);
        }
      });

      if (auth) {
        const { redirect, check, permittedRoutes } = auth;
        this.redirectPage = redirect;
        this.permittedRoutes = permittedRoutes;
        await check();
      } else {
        this.isAuth = false;
      }

      this.defaultRoute = defaultRoute;
      this.routes = { ...routes, [defaultRoute.path]: defaultRoute };
      this.start();
    } catch (error) {
      console.error(error);
    }
  }

  public start = () => {
    window.onpopstate = (event: any) => {
      const target = event.currentTarget as Window;
      this.checkRoute(target);
    };

    this.checkRoute(window);
  };

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.checkRoute(window);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public checkRoute = (target: Window) => {
    let currentRout = target.location.pathname.slice(1);

    if (!currentRout) {
      currentRout = this.defaultRoute.path;
    } else if (!this.routes[currentRout]) {
      currentRout = 'wrong';
    }

    if (this.isAuth && !this.pixelInstantce.store.currentUser.isAuth) {
      this.checkRouteAuth();
    } else {
      this.changeLayout(this.routes[currentRout].component);
    }
  };

  public changeLayout = (componentName: string) => {
    this.pixelInstantce.render(`<${componentName}/>`);
  };

  private checkRouteAuth() {
    const currentRout = window.location.pathname.slice(1);
    const isPermitted = this.permittedRoutes.some((route) => route === currentRout);
    if (!isPermitted) {
      this.go(this.redirectPage);
    } else {
      this.changeLayout(this.routes[currentRout].component);
    }
  }
}

export default Router;
