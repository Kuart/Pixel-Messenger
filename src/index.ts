import { Pixel } from './utils/pixel/pixel';
import { Login } from './pages';
import './index.css';

const root = new Pixel({
  el: '#root',

  components: {
    Login,
  },
  template: /* html */ `
    <div class="container">
      <Login />
    </div>
  `,
});

export default root;
