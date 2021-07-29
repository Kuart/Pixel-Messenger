import { IComponentModel } from '../../../../utils';
import { Modal } from '../../../../components';
import options from '../../../../../static/assets/images/Icon/options.svg';

export function ChatConfig(): IComponentModel {
  return {
    components: {
      Modal,
    },
    componentDidMount() {
      this.methods.modalClose = this.componentProps.modalClose.bind(this);
      window.addEventListener('keydown', this.methods.modalClose);
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.modalClose);
    },
    template: /* html */ `
    <div class="header-title__chat-config">
      <img 
        class="header-title__options" 
        src="${options}" 
        e:click="props.modalClose" 
      />
      <div if:truthy="props.isChatActionsOpen">
        ${Modal(`<div>1</div>`).template}
      </div>
    </div>
    `,
  };
}
