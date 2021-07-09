import { IComponentModel } from '../../../utils';
import badge from '../../../../static/assets/images/Icon/badge.png';

export function ListItem(): IComponentModel {
  return {
    usedProps: ['title', 'avatar', 'last_message', 'unread_count'],
    template: /* html */ `
      <li class="chat-list__item list-item">
        <div class="list-item__photo user-avatar">
          <div class="user-avatar__container">
            <img class="user-avatar__img" p:src="userPhotoUrl" />
          </div>
        </div>
        <div class="list-item__text">
          <h3 class="list-item__title">{{title}}</h3>
          <p class="list-item__message" if:last_message>{{last_message}}</p>
          <p class="list-item__message" if:!last_message>Нет сообщений</p>
        </div>
        <div class="list-item__info">
          <h4 class="list-item__time"></h4>
          <div class="list-item__budge message-budge" if:unread_count>
            <img class="message-budge__icon" src="${badge}" />
            <span class="message-budge__count">{{unread_count}}</span>
          </div>
        </div>
      </li>
    `,
  };
}
