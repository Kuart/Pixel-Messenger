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
    <div class="container">
      <App />
    </div>
  `,
});

export default root;
