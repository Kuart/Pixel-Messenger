import { Pixel } from '..';
import { IDefaultRoute, IRoutes, IRoutesConfig } from './router.type';

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

  public history: History;

  private currentPlace: string;

  private withAuth: boolean = true;

  private isAuth: boolean = false;

  private permittedRoutes: string[];

  private redirect: string;

  private authRedirect: string;

  constructor(pixelInstantce?: typeof Pixel) {
    if (Router.instantce) {
      return Router.instantce;
    }

    this.setPixelInstantce(pixelInstantce);

    this.history = window.history;

    Router.instantce = this;
  }

  public setPixelInstantce(pixelInstantce?: typeof Pixel) {
    if (pixelInstantce) {
      this.pixelInstantce = pixelInstantce;
    }
  }

  public handleAuthChange(isAuth: boolean) {
    if (!isAuth) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }

    this.checkRoute(window, true);
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

      this.defaultRoute = defaultRoute;
      this.routes = { ...routes, [defaultRoute.path]: defaultRoute };

      if (auth) {
        const { redirect, check, permittedRoutes, authRedirect } = auth;
        this.redirect = redirect;
        this.authRedirect = authRedirect;
        this.permittedRoutes = permittedRoutes;
        await check();
      } else {
        this.withAuth = false;
      }

      this.start();
    } catch (error) {
      console.error(error);
    }
  }

  private start = () => {
    window.onpopstate = (event: any) => {
      const target = event.currentTarget as Window;
      this.checkRoute(target);
    };

    this.checkRoute(window);
  };

  public go(pathname: string) {
    this.history.pushState({ page: pathname }, '', pathname);
    this.checkRoute(window);
  }

  private checkRoute = (target: Window = window, authChange?: boolean) => {
    let currentRoute = target.location.pathname.slice(1);

    if (!currentRoute) {
      currentRoute = this.defaultRoute.path;
    } else if (!this.routes[currentRoute]) {
      currentRoute = 'wrong';
    }

    if (this.currentPlace !== currentRoute || authChange) {
      if (this.withAuth) {
        this.replaceWithAuth(currentRoute);
      } else {
        this.changeLayout(this.routes[currentRoute].component, currentRoute);
      }
    }
  };

  private replaceWithAuth(currentRoute: string) {
    const isFromBasePermitted = this.permittedRoutes.some((route) => route === currentRoute);

    if (!this.isAuth && !isFromBasePermitted) {
      this.go(this.redirect);
    } else if (this.isAuth && isFromBasePermitted) {
      this.go(this.authRedirect);
    } else {
      this.changeLayout(this.routes[currentRoute].component, currentRoute);
    }
  }

  public changeLayout = (componentName: string, currentRoute: string) => {
    this.currentPlace = currentRoute;
    this.pixelInstantce.render(`<${componentName}  />`);
  };
}

export default Router;
