import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { Pixel } from './utils/pixel';
import './index.css';

const ROUTES = {
  login: 'login',
  register: 'register',
  messanger: 'messanger',
};

const root = new Pixel({
  el: '#root',
  routes: {
    default: {
      path: ROUTES.login,
      component: 'Login',
    },
    routes: {
      [ROUTES.register]: 'Registration',
      [ROUTES.messanger]: 'Messanger',
      wrong: 'UserMissPage',
      error: 'ServerMissPage',
    },
  },
  components: {
    Login,
    Registration,
    Messanger,
    UserMissPage,
    ServerMissPage,
  },
});

export { root, ROUTES };
