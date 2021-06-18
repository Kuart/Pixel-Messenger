interface IRouterState {
  currentRoute: string;
}

interface IDefaultRoute {
  path: string;
  component: string;
}

interface IRoutes {
  wrong: string;
  error: string;
  [key: string]: string;
}

interface IRoutesConfig {
  default: IDefaultRoute;
  routes: IRoutes;
}

export { IRouterState, IRoutesConfig, IDefaultRoute, IRoutes };
