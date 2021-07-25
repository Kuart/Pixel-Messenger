import { Login, Registration, Messanger, UserMissPage, ServerMissPage } from './pages';
import { routerConfig } from './routes';
import { Pixel } from './utils';
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
