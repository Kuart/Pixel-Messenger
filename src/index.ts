import { Pixel } from './utils/pixel/Pixel';
import { Login } from './pages';

const root = new Pixel({
  el: '#root',

  components: {
    Login,
  },
  template: /* html */ `
    <div !isActive class="container" color="red">
      Hi!
      <Login />
    </div>
  `,
});

export default root;
