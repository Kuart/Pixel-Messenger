import { Modal, Input, Button } from '../../../../components';
import { IComponentModel } from '../../../../utils';
import { CustomEventTarget } from '../../../../types';
import { ChatController } from '../../../../controllers';

const chatController = new ChatController();

export function CreateModal(): IComponentModel {
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
        this.componentProps.modalClose();
      },
      handleEsc(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      },
    },
    componentDidMount() {
      this.methods.handleEsc = this.methods.handleEsc.bind(this);
      window.addEventListener('keydown', this.methods.handleEsc);
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.handleEsc);
    },
    template: /* html */ `
    ${
      Modal(/* html */ `
      <form class="create-chat__form" id="id-create-chat">
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
    `).template
    }
    `,
  };
}
