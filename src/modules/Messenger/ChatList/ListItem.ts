import { IComponentModel } from '../../../utils';
import { UserPhoto } from '../../../components';
import badge from '../../../assets/images/Icon/badge.png';

export function ListItem(): IComponentModel {
  return {
    state: {
      isAuthor: false,
    },
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
          <UserPhoto b:photo="props.avatar"/>
        </div>
        <div class="list-item__text">
          <h3 class="list-item__title">{{props.title}}</h3>
          <p class="list-item__message" if:truthy="props.lastMessage" >{{props.lastMessage.content}}</p>
          <p class="list-item__message" if:falsy="props.lastMessage">Нет сообщений</p>
        </div>
        <div class="list-item__info">
          <h4 class="list-item__time">{{props.lastMessage.time}}</h4>
          <div class="list-item__budge message-budge" if:truthy="props.unread_count">
            <img class="message-budge__icon" src="${badge}" />
            <span class="message-budge__count">{{props.unread_count}}</span>
          </div>
        </div>
      </li>
    `,
  };
}
