import { IComponentModel } from '../../../utils';
import setting from '../../../../static/assets/images/Icon/maskGroup.svg';
import { Menu, Profile, CreateModal } from './Menu';
import { ChatConfig } from './ChatConfig';
import { AuthController } from '../../../controllers';
import { CustomEventTarget } from '../../../interfaces';
import { SETTING_OPTIONS } from '../const';
import './Header.css';

const authController = new AuthController();

export function Header(): IComponentModel {
  return {
    components: {
      Menu,
      CreateModal,
      Profile,
      ChatConfig,
    },
    state: {
      isMenu: false,
      isChatCreate: false,
      isProfileOpen: false,
      isChatActionsOpen: false,
      selectedChat: {},
    },
    methods: {
      settingClickHandler() {
        this.state.isMenu = !this.state.isMenu;
      },
      closeCreateModal() {
        this.state.isChatCreate = false;
      },
      closeProfileModal() {
        this.state.isProfileOpen = false;
      },
      optionClick(event: CustomEventTarget<Record<string, any>>) {
        const { name } = event.target.dataset;

        switch (name) {
          case SETTING_OPTIONS.PROFILE:
            this.state.isProfileOpen = true;
            break;
          case SETTING_OPTIONS.CREATE_CHAT:
            this.state.isChatCreate = true;
            break;
          case SETTING_OPTIONS.LOGOUT:
            authController.logout();
            break;
          default:
        }
      },
      handleChatConfig() {
        this.state.isChatActionsOpen = !this.state.isChatActionsOpen;
      },
    },
    pixelStore: ['selectedChat'],
    template: /* html */ `
      <header class="messanger__header">
        <section class="messanger__header-title">
          <h2 class="header-title__logo">Pixel Chat</h2>
          <img class="header-title__settings" src="${setting}" e:click="methods.settingClickHandler"/>
          <Menu if:truthy="state.isMenu" b:optionClick="methods.optionClick"/>        
        </section>
        
        <div class="messanger__chat-info">
          <div class="chat-info__container">
            <h2 class="chat-info__title">{{state.selectedChat.title}}</h2>
            <ChatConfig 
              if:truthy="state.selectedChat.id" 
              headerText="Настройка чата"
              b:isChatActionsOpen="state.isChatActionsOpen"
              b:modalClose="methods.handleChatConfig"
              b:chat="state.selectedChat"
            />
          </div>
        </div>
      </header>

      <CreateModal 
        if:truthy="state.isChatCreate" 
        b:modalClose="methods.closeCreateModal" 
        headerText="Создание нового чата"
      />

      <Profile 
        if:truthy="state.isProfileOpen" 
        b:modalClose="methods.closeProfileModal" 
        headerText="Профиль"
      />
    `,
  };
}
