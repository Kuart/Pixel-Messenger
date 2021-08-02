/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import Router from './router';

const routerConfig = {
  defaultRoute: {
    path: 'login',
    component: 'Login',
    title: 'Вход',
  },
  routes: {
    register: {
      component: 'Registration',
      title: 'Регистрация',
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

const pixelInstantce = {
  components: {
    Registration: () => {},
    Login: () => {},
    UserMissPage: () => {},
    ServerMissPage: () => {},
  },
  render: () => {},
};

describe('Router', () => {
  it('should have window history property', () => {
    const router = new Router();
    expect(router).haveOwnProperty('history').equal(window.history);
  });

  it('should can set pixel instantce after create', () => {
    const router = new Router();
    router.setPixelInstantce(pixelInstantce as any);
    expect(router).property('pixelInstantce').to.not.be.an('undefined');
  });

  it('method setRoutes should create routes', () => {
    const router = new Router();
    router.setRoutes(routerConfig);

    expect(router.defaultRoute).to.not.be.an('undefined');
    expect(router.routes).to.not.be.an('undefined');
  });

  it('method "handleAuthChange" should change auth prop', () => {
    const router = new Router();
    router.handleAuthChange(true);
    expect(router).property('isAuth').equal(true);

    router.handleAuthChange(false);
    expect(router).property('isAuth').not.equal(true);
  });

  it('method "go" should change history state', () => {
    const router = new Router();
    router.go('/login');
    expect(router.history.state).property('page').equal('/login');
  });
});
