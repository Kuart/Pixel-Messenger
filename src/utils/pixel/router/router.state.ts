interface IRouterState {
  history: History;
}

interface IBaseAuth {
  check: () => Promise<any>;
  redirect: string;
  permittedRoutes: string[];
}

interface IDefaultRoute {
  path: string;
  component: string;
  title: string;
}

interface IRouteConfig {
  component: string;
  title: string;
}
interface IRoutes {
  wrong: IRouteConfig;
  error: IRouteConfig;
  [key: string]: IRouteConfig;
}

interface IRoutesConfig {
  auth: IBaseAuth;
  routes: IRoutes;
  defaultRoute: IDefaultRoute;
}

export { IRouterState, IRoutesConfig, IDefaultRoute, IRoutes };
