interface IRouterState {
  history: History;
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
  default: IDefaultRoute;
  routes: IRoutes;
}

export { IRouterState, IRoutesConfig, IDefaultRoute, IRoutes };
