import { IComponentModel } from '../../../../utils';
import { EditInput } from '../../../../components';
import { CustomEventTarget } from '../../../../interfaces';
import { Participants } from './Participants';
import { chatConfigController } from './chat-config.controller';
import './ChatConfig.css';

export function Config(): IComponentModel {
  return {
    state: {
      chatUsers: [],
      title: '',
    },
    methods: {
      changeTitle(event: CustomEventTarget<HTMLInputElement>) {
        const { value } = event?.target;
        this.state.title = value;
      },
      addUser(event: Event) {
        event.preventDefault();
        chatConfigController.addUser(this.state.title, this);
      },
      removeUser(id: number) {
        chatConfigController.removeUser(id, this);
      },
      handlePhotoChange(event: Event) {
        event.preventDefault();
        chatConfigController.updateAvatar(event, this.componentProps.chat.id);
      },
    },
    componentDidMount() {
      chatConfigController.getUsers(this);
    },
    components: {
      EditInput,
      Participants,
    },
    template: /* html */ `
      <div class="chat-config">
        <div class="chat-config__info-title">
          <div class="chat-config__title">{{props.chat.title}}</div>
          <UserPhoto 
            b:photo="props.chat.avatar" 
            inputId="chat_change_photo"
            containerClass="chat__avatar-container profile__avatar-container_edit" 
            b:onChange="methods.handlePhotoChange" />
        </div>
        <div class="participants__container">
          <Participants b:chatUsers="state.chatUsers" b:removeUser="methods.removeUser"/>

          <EditInput 
            buttonText="Добавить участника" 
            name="title"
            id="add_user_id"
            b:value="state.title" 
            b:onClick="methods.addUser" 
            b:onChange="methods.changeTitle"
            b:isChanged="state.title"
          />
        </div>
      </div>
    `,
  };
}
