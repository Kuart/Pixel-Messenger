import { PixelDOM, routs } from './utils';
import { App } from './App';

export const Pixel = new PixelDOM({
  [`#${routs.login}`]: 'Login',
  [`#${routs.register}`]: 'Registration',
  [`#${routs.messanger}`]: 'Messanger'
});

Pixel.init(App, document.querySelector('#root'));
