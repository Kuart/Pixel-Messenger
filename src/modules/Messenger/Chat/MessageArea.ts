import { IComponentModel } from '../../../utils';

export function MessageArea(): IComponentModel {
  return {
    componentDidMount() {
      this.componentProps.setScrollEl(this.domEl);
    },
    template: /* html */ `
    <div class="chat__messages-area">
      <Message if:truthy="props.chat.messages" map:array="props.chat.messages" />
      <div if:falsy="props.chat.messages" class="messanger__chat-blank">Нет сообщений</div>
    </div>
    `,
  };
}
