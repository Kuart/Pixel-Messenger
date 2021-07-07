import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { ProfileTempPage } from './modules';
import { Pixel } from './utils/pixel';
import { routesConfig } from './routes';
import './index.css';

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
