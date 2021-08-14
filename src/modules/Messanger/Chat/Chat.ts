import { IComponentModel } from '../../../utils';
import { Input, UserPhoto, Button, Textarea } from '../../../components';
import { Message } from './Message';
import { MessageArea } from './MessageArea';

import clip from '../../../../static/assets/images/Icon/clip1.png';
import alien from '../../../../static/assets/images/Icon/alien.png';
import pink from '../../../../static/assets/images/Icon/_emj14.png';
import fire from '../../../../static/assets/images/Icon/emoji3.png';
import shock from '../../../../static/assets/images/Icon/shock.png';

import './Chat.css';
import { CustomEventTarget } from '../../../interfaces';
import { messagesController } from '../../../controllers';

export function Chat(): IComponentModel {
  return {
    state: {
      selectedChat: {},
      stickers: false,
      currentUser: null,
      scrollEl: null,
      message: '',
    },
    methods: {
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        this.state.message = event.target.value;
      },
      setScrollEl(domEl: HTMLElement) {
        this.state.scrollEl = domEl;
      },
      sendMessage(event?: Event) {
        const { message, selectedChat } = this.state;

        if (event) {
          event.preventDefault();
        }

        if (message.trim().length) {
          messagesController.send(selectedChat.id, message);
          this.state.message = '';
        }
      },
    },
    components: {
      Input,
      Message,
      UserPhoto,
      Button,
      Textarea,
      MessageArea,
    },
    componentDidUpdate(_, props: Record<string, string>) {
      if (props.selectedChat) {
        this.state.scrollEl.scrollTop = this.state.scrollEl.scrollHeight;
      }
    },
    pixelStore: ['selectedChat', 'currentUser'],
    template: /* html */ `
    <main class="messanger__chat">
      <span if:falsy="state.selectedChat.id" class="messanger__chat-blank">Чат не выбран</span>
      <div if:truthy="state.selectedChat.id" class="chat__container" >
        <MessageArea b:chat="state.selectedChat" b:setScrollEl="methods.setScrollEl"/>

        <div class="chat__input-area">
          <UserPhoto 
            containerClass="user-avatar__container_input" 
            imgClass="user-avatar__img_input" b:photo="state.currentUser.avatar" />

          <form class="chat__message-form" e:submit="methods.sendMessage">

            <div class="message-form__textarea-wraper">
              <Textarea 
                placeholder="Сообщение" 
                name="newMessage" 
                b:value="state.message"  
                b:onChange="methods.inputHandler"
                b:onKeyDown="methods.sendMessage"
              />
              <img src="${clip}" class="message-form__options"/>
            </div>

            <div class="message-form__action-line">
              <div class="action-line__emoji-bar" >
                <img src="${alien}" class="emoji"/>
                <img src="${fire}" class="emoji"/>
                <img src="${shock}" class="emoji"/>
                <img src="${pink}" class="emoji"/>
              </div>

              <Button 
                type="submit" 
                text="Отправить" 
                class="button_transparent button_transparent_send" 
                b:onClick="methods.sendMessage" 
              />
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
