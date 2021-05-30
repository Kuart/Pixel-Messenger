import './Chat.css';
import avatar from 'url:../../../../static/assets/images/Icon/ava.png';
import clip from 'url:../../../../static/assets/images/Icon/clip1.png';

import alien from 'url:../../../../static/assets/images/Icon/alien.png';
import pink from 'url:../../../../static/assets/images/Icon/_emj14.png';
import fire from 'url:../../../../static/assets/images/Icon/emoji3.png';
import shock from 'url:../../../../static/assets/images/Icon/shock.png';
import user9 from 'url:../../../../static/assets/images/Icon/_emj12.png';
import sticker from 'url:../../../../static/assets/images/Icon/emoji3.png';

import { Pixel } from '../../..';
import { Button, Input } from '../../../components';
import { UserPhoto } from '../../../components/';
import { Message } from './Message';

export function Chat() {
  Pixel.registerComponent(Button);
  Pixel.registerComponent(UserPhoto);
  Pixel.registerComponent(Input);
  Pixel.registerComponent(Message);

  const context = {
    textareaChangeHandler,
    messages: [
      {
        author: 'Денис',
        message: `<img src="${shock}" class="emoji" />`,
        time: '14:25',
        photo: avatar,
        isAuthor: true
      },
      {
        author: 'Даник',
        message: `а я успеваю! <img src="${alien}" class="emoji"/>`,
        time: '14:24',
        photo: user9
      },
      {
        author: 'Денис',
        message: `<img src="${sticker}" class="sticker"/>`,
        time: '13:44',
        photo: avatar,
        isAuthor: true
      },
      {
        author: 'Даник',
        message: `Успеваешь к дедлайну?`,
        time: '12:20',
        photo: user9
      }
    ]
  };
  const template = `
    <main class="messanger__chat">
      <div class="chat__container">

        <div class="chat__messages-area">
          {{# @messages @Message #}}
        </div>

        <div class="chat__input-area">
          {{@UserPhoto @containerClass=user-avatar__container_input @imgClass=user-avatar__img_input @photo=${avatar} @}}

          <form class="chat__message-form" >
            <div class="message-form__textarea-wraper">
              {{@Input  
                @inputType=textarea 
                @eventTarget=message-form__textarea  
                @placeholder=Сообщение 
                @name=newMessage
                @_eventInput=textareaChangeHandler=message-form__textarea 
              @}}

              <img src="${clip}" class="message-form__options"/>
            </div>

            <div class="message-form__action-line">
              <div class="action-line__emoji-bar">
                <img src="${alien}" class="emoji"/>
                <img src="${fire}" class="emoji"/>
                <img src="${shock}" class="emoji"/>
                <img src="${pink}" class="emoji"/>
              </div>
              
              {{@Button @text=Отправить @class=button_transparent button_transparent_send-btn   @}}
            </div>
            
          </form>
          
          {{@UserPhoto @containerClass=user-avatar__container_input @imgClass=user-avatar__img_input @photo=${user9} @}}
         
        </div>
      </div>
    </main>`;
  return {
    template,
    context,
    name: 'Chat'
  };
}

function textareaChangeHandler(event) {
  const { name, value } = event.target;
  console.log(name, value);
}
