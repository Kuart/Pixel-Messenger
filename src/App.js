import { Pixel } from '.';
import './index.css';
import { Login, Registration } from './pages';

export function App(props) {
  if (props.page === 'Login') {
    Pixel.registerComponent(Login);
  } else {
    Pixel.registerComponent(Registration);
  }

  const context = { ...props };
  const template = `<div class="container">{{@ ${props.page} @}}</div>`;

  return {
    template,
    context
  };
}
