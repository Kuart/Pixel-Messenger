import { PixelDOM, routs } from './utils';
import { App } from './App';

export const Pixel = new PixelDOM({
  [`#${routs.login}`]: 'Login',
  [`#${routs.register}`]: 'Registration',
  [`#${routs.messanger}`]: 'Messanger',
  [`#${routs.wrongRout}`]: 'UserMissPage',
  [`#${routs.serverError}`]: 'ServerMissPage'
});

Pixel.init(App, 'App', document.querySelector('#root'));
