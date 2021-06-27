import { IComponentModel } from '../../../utils';
import './Message.css';

export function Message(): IComponentModel {
  return {
    usedProps: ['photo', 'time', 'message', 'author', 'isAuthor'],
    template: /* html */ `
    <article class="messages-area__message">
      <div class="user-avatar__container user-avatar__container_message">
        <img p:src="photo" class="user-avatar__img user-avatar__img_message" />
      </div>
      <div class="messages-area__content">
        <span class="content__author content__author_own" if:isAuthor  >{{author}}</span>
        <span class="content__author" else:!isAuthor >{{author}}</span>
        <p class="content__message">{{message}}</p>
      </div>
      <div class="messages-area__time">{{time}}</div>
    </article>
    `,
  };
}