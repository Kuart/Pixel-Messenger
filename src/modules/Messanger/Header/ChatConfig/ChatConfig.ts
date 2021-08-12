import { IComponentModel } from '../../../../utils';
import { Modal } from '../../../../components';
import { Config } from './Config';
import { chatConfigController } from './chat-config.controller';
import options from '../../../../../static/assets/images/Icon/options.svg';
import deleteIcon from '../../../../../static/assets/images/Icon/Delete.svg';

export function ChatConfig(): IComponentModel {
  return {
    components: {
      Modal,
      Config,
    },
    methods: {
      handleEsc(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      },
      deleteChat() {
        chatConfigController.removeChat(this);
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
    <div class="header-title__chat-config">
      <img 
        class="header-title__options" 
        src="${options}" 
        e:click="props.openChatConfig" 
      />
      <div if:truthy="props.isChatActionsOpen">
        ${
          Modal(
            /* html */ `
            <Config 
              b:chat="props.chat"
            />
        `,
            '',
            '',
            /* html */ `
        <img 
          class="header-title__options" 
          src="${deleteIcon}" 
          e:click="methods.deleteChat" 
        />
        `
          ).template
        }
      </div>
    </div>
    `,
  };
}
