import { IComponentModel } from '../../../utils';
import badge from '../../../../static/assets/images/Icon/badge.png';

export function ListItem(): IComponentModel {
  return {
    template: /* html */ `
      <li class="chat-list__item list-item {{?if=isActive=chat-list__item_active=if?}}">
        <div class="list-item__photo user-avatar">
          <div class="user-avatar__container">
            <img class="user-avatar__img" src="{{userPhotoUrl}}" />
          </div>
        </div>
        <div class="list-item__text">
          <h3 class="list-item__title">{{userName}}</h3>
          {{? 
              if=isAuther=<p class="list-item__message">Вы: @message@</p>=if
              else=<p class="list-item__message">@message@</p>=else
          ?}}
        </div>
        <div class="list-item__info">
          <h4 class="list-item__time">{{time}}</h4>
          {{? 
              if=messageCount=
                <div class="list-item__budge message-budge">
                  <img class="message-budge__icon" src="${badge}" />
                  <span class="message-budge__count">@messageCount@</span>
                </div>
              =if
          ?}}
        </div>
      </li>
    `,
  };
}
