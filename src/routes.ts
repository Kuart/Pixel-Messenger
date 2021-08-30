import { CookieAuthController } from './controllers';

const cookieAuthController = new CookieAuthController();

const ROUTES = {
  login: 'login',
  register: 'register',
  messenger: 'messenger',
  profile: 'profile',
};

const routerConfig = {
  auth: {
    check: cookieAuthController.checkAuth,
    redirect: ROUTES.login,
    authRedirect: ROUTES.messenger,
    permittedRoutes: [ROUTES.login, ROUTES.register],
  },
  defaultRoute: {
    path: ROUTES.login,
    component: 'Login',
    title: 'Вход',
  },
  routes: {
    [ROUTES.register]: {
      component: 'Registration',
      title: 'Регистрация',
    },
    [ROUTES.messenger]: {
      component: 'Messenger',
      title: 'Чат',
    },
    wrong: {
      component: 'UserMissPage',
      title: 'Страница не найдена',
    },
    error: {
      component: 'ServerMissPage',
      title: 'Страница временно недоступна',
    },
  },
};

export { ROUTES, routerConfig };
