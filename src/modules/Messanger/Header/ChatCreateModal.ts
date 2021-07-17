import { IComponentModel, generateUniqId } from '../../../utils';
import { Modal, Input, Button } from '../../../components';
import { ChatController } from '../../../controllers';
import { CustomEventTarget } from '../../../types';
import img from '../../../../static/assets/images/Icon/image.svg';
import './Header.css';

const chatController = new ChatController();

export function ChatCreateModal(): IComponentModel {
  return {
    state: {
      title: '',
      error: '',
    },
    components: {
      Modal,
      Input,
      Button,
    },
    methods: {
      createChatInputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state[name] = value;
      },
      createChatSubmitForm(event: Event) {
        event.preventDefault();
        chatController.createChat(this.state);
      },
    },
    usedProps: ['chatCteateModal'],
    template: /* html */ `
    <div p:class="chatCteateModal" >
      <div class="modal-window__container">
        <div class="modal-window__header">
          <div>{{headerTitle}}</div>
          <img src="${img}" e:click="closeModal" />
        </div>
        <div class="modal-window__body">
          <form class="modal-window__form" id="id-create-chat">
              <Input 
                s:label="Название чата"
                e:input="createChatInputHandler" 
                s:name="title" 
                s:type="text" 
                s:id="input${generateUniqId()}" 
                b:errors="error"
                b:value="title" />

              <footer class="modal-window__footer">
                <Button 
                  s:text="ОК" 
                  class="button button_accent button_accent-short" 
                  s:type="button" 
                  e:click="createChatSubmitForm" 
                  form="id-create-chat"/>
              </footer>
            </form>
        </div>
      </div>
    </div>
    `,
  };
}
