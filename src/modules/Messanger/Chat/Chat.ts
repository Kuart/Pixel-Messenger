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
    methods: {
      click() {},
    },
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
          
        </div>
        <div class="chat__input-area">
          <UserPhoto 
            containerClass="user-avatar__container_input" 
            imgClass="user-avatar__img_input" photo="${avatar}" />
          <form class="chat__message-form" >
            <div class="message-form__textarea-wraper">
              
              <img src="${clip}" class="message-form__options"/>
            </div>
            <div class="message-form__action-line">
              <div class="action-line__emoji-bar">
                <img src="${alien}" class="emoji"/>
                <img src="${fire}" class="emoji"/>
                <img src="${shock}" class="emoji"/>
                <img src="${pink}" class="emoji"/>
              </div>

              <Button text="" class="button_transparent button_transparent_send" b:onClick="methods.click" />
            </div>
            
          </form>
          <UserPhoto 
            containerClass="user-avatar__container_input" 
            imgClass="user-avatar__img_input" photo="${user9}" />
        </div>
      </div>
    </main>
    `,
  };
}
/* <Message loop:messages /> */
/* <Textarea placeholder="Сообщение" name="newMessage"/> */
