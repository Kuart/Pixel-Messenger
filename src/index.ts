import Pixel from './utils/pixel/pixel';
import routes from './utils/const/routes';

const root = new Pixel({
  el: '#root',
  routes: {
    '/login': routes.login,
    '/register': routes.register,
    '/messanger': routes.messanger,
    '/wrongRout': routes.wrongRout,
    '/error': routes.error,
  },
  template: /* html */ `
    <div !isActive class="container" color="red">
      <span>Hi!</span>
    </div>
  `,
});

export default root;
