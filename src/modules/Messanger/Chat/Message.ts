import { IComponentModel } from '../../../utils';
import './Message.css';

export function Message(): IComponentModel {
  return {
    template: /* html */ `
    <article class="messages-area__message">
      <div class="user-avatar__container user-avatar__container_message">
      <UserPhoto 
        imgClass="user-avatar__img user-avatar__img_message" b:photo="props.avatar" />
     
      </div>
      <div class="messages-area__content">
        <span class="content__author content__author_own" >{{props.name}}</span>
        <p class="content__message">{{props.content}}</p>
      </div>
      <div class="messages-area__time">{{props.time}}</div>
    </article>
    `,
  };
}
