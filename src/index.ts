import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { routerConfig } from './routes';
import { Pixel } from './utils';
import './index.css';

Pixel.config({
  el: '#root',
  routerConfig,
  components: {
    Login,
    Registration,
    Messanger,
    UserMissPage,
    ServerMissPage,
  },
});
