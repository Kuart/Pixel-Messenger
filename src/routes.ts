const ROUTES = {
  login: 'login',
  register: 'register',
  messanger: 'messanger',
  profile: 'profile',
};

const routesConfig = {
  default: {
    path: ROUTES.login,
    component: 'Login',
    title: 'Вход',
  },
  routes: {
    [ROUTES.register]: {
      component: 'Registration',
      title: 'Регистрация',
    },
    [ROUTES.messanger]: {
      component: 'Messanger',
      title: 'Чат',
    },
    [ROUTES.profile]: {
      component: 'ProfileTempPage',
      title: 'Профиль',
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

export { ROUTES, routesConfig };
