import { Pixel } from '../..';
import { Header, ChatList, Chat } from '../../modules/';
import './Messanger.css';

export function Messanger(props) {
  Pixel.registerComponent(Header);
  Pixel.registerComponent(ChatList);
  Pixel.registerComponent(Chat);

  const context = {
    ...props
  };

  const template = `
  <div class="messanger">
    {{@ Header @}}
    {{@ ChatList @}}
    {{@ Chat @}}
  </div>`;

  return { template, context, name: 'Messanger' };
}
