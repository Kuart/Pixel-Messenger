import { IComponentModel } from '../../../utils';
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
      Input,
      Button,
    },
    methods: {
      close(event: any) {
        event.preventDefault();
        this.props.closeModal();
      },
      chatInputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state[name] = value;
      },
      createChatSubmitForm(event: Event) {
        event.preventDefault();
        chatController.createChat(this.state);
      },
    },
    template: /* html */ `
    <div>1</div>
    `,
  };
}

/* <div class="modal-window__container">
        <section class="modal">
          <header class="modal__header">
            <div>{{props.headerTitle}}</div>
            <img src="${img}" e:click="props.closeModal" />
          </header>
          <div class="modal__body">
            <form class="modal-window__form" id="id-create-chat">
              <Input 
                label="Название чата"
                name="title" 
                type="text" 
                id="create_chat_title" 
                b:onChange="methods.chatInputHandler" 
                b:error="state.error"
                b:value="state.title" />

              <footer class="modal-window__footer">
                <Button 
                  text="ОК" 
                  class="button_accent button_accent-short" 
                  type="button" 
                  b:onClick="methods.createChatSubmitForm" 
                  form="id-create-chat"/>
              </footer>
            </form>
          </div>              
        </section>
      </div> */
