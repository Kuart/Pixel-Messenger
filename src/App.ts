import root from './index';

root.component('App', {
  data: {
    message: 'hello!',
  },
  template: /* html */ `
    <div>{{message}}</div>
  `,
});
