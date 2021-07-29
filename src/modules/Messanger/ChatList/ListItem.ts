import { IComponentModel } from '../../../utils';
import { UserPhoto } from '../../../components';
import badge from '../../../../static/assets/images/Icon/badge.png';

export function ListItem(): IComponentModel {
  return {
    components: {
      UserPhoto,
    },
    methods: {
      setChat() {
        const { setActiveChat, id } = this.componentProps;
        setActiveChat(id);
      },
    },
    template: /* html */ `
      <li class="chat-list__item list-item" e:click="methods.setChat">
        <div class="list-item__photo user-avatar">
          <UserPhoto p:photo="props.avatar" p:imgClass="props.user-avatar__img"/>
        </div>
        <div class="list-item__text">
          <h3 class="list-item__title">{{props.title}}</h3>
          <p class="list-item__message" if:truthy="props.last_message" >{{props.last_message}}</p>
          <p class="list-item__message" if:falsy="props.last_message">Нет сообщений</p>
        </div>
        <div class="list-item__info">
          <h4 class="list-item__time"></h4>
          <div class="list-item__budge message-budge" if:truthy="props.unread_count">
            <img class="message-budge__icon" src="${badge}" />
            <span class="message-budge__count">{{props.unread_count}}</span>
          </div>
        </div>
      </li>
    `,
  };
}
