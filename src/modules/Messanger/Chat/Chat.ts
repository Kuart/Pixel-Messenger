import { IComponentModel } from '../../../utils';
import { Input, UserPhoto, Button, Textarea } from '../../../components';
import { Message } from './Message';

import clip from '../../../../static/assets/images/Icon/clip1.png';
import alien from '../../../../static/assets/images/Icon/alien.png';
import pink from '../../../../static/assets/images/Icon/_emj14.png';
import fire from '../../../../static/assets/images/Icon/emoji3.png';
import shock from '../../../../static/assets/images/Icon/shock.png';

import './Chat.css';
import { ChatController } from '../../../controllers';
import { CustomEventTarget } from '../../../interfaces';

const chatController = new ChatController();

export function Chat(): IComponentModel {
  return {
    state: {
      selectedChat: {},
      stickers: false,
      currentUser: null,
      message: '',
      messages: [],
    },
    methods: {
      click(event: Event) {
        event.preventDefault();
        chatController.socket.sendMessage(this.state.message);
        this.state.message = '';
      },
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        this.state.message = event.target.value;
      },
    },
    components: {
      Input,
      Message,
      UserPhoto,
      Button,
      Textarea,
    },
    componentDidUpdate(old: any, newProps: any) {
      if ('selectedChat' in newProps && newProps.selectedChat) {
        chatController.initChat(newProps.selectedChat);
      }
    },
    pixelStore: ['selectedChat', 'currentUser'],
    template: /* html */ `
    <main class="messanger__chat">
      <span if:falsy="state.selectedChat.id" class="messanger__chat-blank">Чат не выбран</span>
      <div if:truthy="state.selectedChat.id" class="chat__container" >
        <div class="chat__messages-area">
          <Message if:truthy="state.messages" map:array="state.messages" />
          <div if:falsy="state.messages" class="messanger__chat-blank">Нет сообщений</div>
        </div>
        
        <div class="chat__input-area">
          <UserPhoto 
            containerClass="user-avatar__container_input" 
            imgClass="user-avatar__img_input" b:photo="state.currentUser.avatar" />

          <form class="chat__message-form" >

            <div class="message-form__textarea-wraper">
              <Textarea 
                placeholder="Сообщение" 
                name="newMessage" 
                b:value="state.message"  
                b:onChange="methods.inputHandler"/>
              <img src="${clip}" class="message-form__options"/>
            </div>

            <div class="message-form__action-line">
              <div class="action-line__emoji-bar" >
                <img src="${alien}" class="emoji"/>
                <img src="${fire}" class="emoji"/>
                <img src="${shock}" class="emoji"/>
                <img src="${pink}" class="emoji"/>
              </div>

              <Button text="Отправить" class="button_transparent button_transparent_send" b:onClick="methods.click" />
            </div>
            
          </form>

          <UserPhoto 
            containerClass="user-avatar__container_input" 
            imgClass="user-avatar__img_input" b:photo="state.selectedChat.avatar" />
        </div>
      </div>
    </main>
    `,
  };
}
