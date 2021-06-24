import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { ProfileTempPage } from './modules';
import { Pixel } from './utils/pixel';
import './index.css';

const ROUTES = {
  login: 'login',
  register: 'register',
  messanger: 'messanger',
  profile: 'profile',
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
      [ROUTES.profile]: 'ProfileTempPage',
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
    ProfileTempPage,
  },
});

export { root, ROUTES };
