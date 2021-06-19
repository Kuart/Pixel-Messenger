import { IComponentModel } from '../../../utils';
import badge from '../../../../static/assets/images/Icon/badge.png';

export function ListItem(): IComponentModel {
  return {
    usedProps: ['isAuther', 'message', 'userName', 'messageCount', 'time', 'userPhotoUrl'],
    template: /* html */ `
      <li class="chat-list__item list-item">
        <div class="list-item__photo user-avatar">
          <div class="user-avatar__container">
            <img class="user-avatar__img" p:src="userPhotoUrl" />
          </div>
        </div>
        <div class="list-item__text">
          <h3 class="list-item__title">{{userName}}</h3>
            <p class="list-item__message">Вы: {{message}}</p>
            <p class="list-item__message">{{message}}</p>
        </div>
        <div class="list-item__info">
          <h4 class="list-item__time">{{time}}</h4>
            <div class="list-item__budge message-budge">
              <img class="message-budge__icon" src="${badge}" />
              <span class="message-budge__count">{{messageCount}}</span>
            </div>
        </div>
      </li>
    `,
  };
}
