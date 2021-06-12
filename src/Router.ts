export default function Router() {
  console.log('Router');
}

const routes: {
  '/login': routes.login;
  '/register': routes.register;
  '/messanger': routes.messanger;
  '/wrongRout': routes.wrongRout;
  '/error': routes.error;
};

export { Router };
