import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { ProfileTempPage } from './modules';
import { Pixel } from './utils/pixel';
import './index.css';
import { routesConfig } from './routes';

const root = new Pixel({
  el: '#root',
  routes: routesConfig,
  components: {
    Login,
    Registration,
    Messanger,
    UserMissPage,
    ServerMissPage,
    ProfileTempPage,
  },
});

export { root };
