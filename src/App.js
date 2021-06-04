import { Pixel } from '.';
import { Login, Registration } from './pages';
import { Messanger } from './pages';
import './index.css';
import { ServerMissPage, UserMissPage } from './pages/MissedPage';

export function App(props) {
  const context = { ...props };

  if (props.page === 'Login') {
    Pixel.registerComponent(Login);
  } else if (props.page === 'Registration') {
    Pixel.registerComponent(Registration);
  } else if (props.page === 'Messanger') {
    Pixel.registerComponent(Messanger);
  } else if (props.page === 'ServerMissPage') {
    Pixel.registerComponent(ServerMissPage);
    context.location = 'container_server-miss';
  } else {
    Pixel.registerComponent(UserMissPage);
    context.location = 'container_user-miss';
  }

  const template = `<div class="container {{location}}">{{@ ${props.page} @}}</div>`;

  return {
    template,
    context,
    name: 'App'
  };
}
