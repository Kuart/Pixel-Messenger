import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { routerConfig } from './routes';
import { Pixel } from './utils';
import './style/main.css';
import './style/normalize.css';
import './index.css';

const currentUserDefault = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
};

Pixel.config({
  el: '#root',
  store: {
    currentUser: currentUserDefault,
    selectedChat: null,
    chatUsers: [],
    chats: [],
    filteredChats: [],
  },
  routerConfig,
  components: {
    Login,
    Registration,
    Messanger,
    UserMissPage,
    ServerMissPage,
  },
});
