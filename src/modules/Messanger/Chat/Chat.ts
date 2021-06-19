import { IComponentModel } from '../../../utils';
import { Input, UserPhoto, Button, Textarea } from '../../../components';
import { Message } from './Message';

import avatar from '../../../../static/assets/images/Icon/ava.png';
import clip from '../../../../static/assets/images/Icon/clip1.png';

import alien from '../../../../static/assets/images/Icon/alien.png';
import pink from '../../../../static/assets/images/Icon/_emj14.png';
import fire from '../../../../static/assets/images/Icon/emoji3.png';
import shock from '../../../../static/assets/images/Icon/shock.png';
import user9 from '../../../../static/assets/images/Icon/_emj12.png';

import './Chat.css';
import { messages } from './const';

export function Chat(): IComponentModel {
  return {
    state: {
      messages,
    },
    methods: {},
    components: {
      Input,
      Message,
      UserPhoto,
      Button,
      Textarea,
    },
    template: /* html */ `
    <main class="messanger__chat">
      <div class="chat__container">
        <div class="chat__messages-area">
          <Message loop:messages />
        </div>
        <div class="chat__input-area">
          <UserPhoto s:containerClass="user-avatar__container_input" s:imgClass="user-avatar__img_input" s:photo="${avatar}" />
          <form class="chat__message-form" >
            <div class="message-form__textarea-wraper">
              <Textarea s:placeholder="Сообщение" s:name="newMessage"/>
              <img src="${clip}" class="message-form__options"/>
            </div>
            <div class="message-form__action-line">
              <div class="action-line__emoji-bar">
                <img src="${alien}" class="emoji"/>
                <img src="${fire}" class="emoji"/>
                <img src="${shock}" class="emoji"/>
                <img src="${pink}" class="emoji"/>
              </div>

              <Button s:text="" class="button button_transparent button_transparent_send" />
            </div>
            
          </form>
          <UserPhoto s:containerClass="user-avatar__container_input" s:imgClass="user-avatar__img_input" s:photo="${user9}" />
        </div>
      </div>
    </main>
    `,
  };
}
