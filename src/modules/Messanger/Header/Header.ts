import { IComponentModel } from '../../../utils';
import setting from '../../../../static/assets/images/Icon/maskGroup.svg';
import options from '../../../../static/assets/images/Icon/options.svg';
import { Menu } from './Menu';
import { CreateModal } from './CreateModal';
import { ChatCreateModal } from './ChatCreateModal';
import { AuthController } from '../../../controllers';
import { CustomEventTarget } from '../../../types';
import { SETTING_OPTIONS } from '../const';
import './Header.css';

const authController = new AuthController();

export function Header(): IComponentModel {
  return {
    components: {
      Menu,
      CreateModal,
      ChatCreateModal,
    },
    state: {
      isMenu: false,
      isChatCreate: false,
    },
    methods: {
      settingClickHandler() {
        this.state.isMenu = !this.state.isMenu;
      },
      optionClick(event: CustomEventTarget<Record<string, any>>) {
        const { name } = event.target.dataset;

        switch (name) {
          case SETTING_OPTIONS.PROFILE:
            break;
          case SETTING_OPTIONS.CREATE_CHAT:
            console.log(this);
            this.state.isChatCreate = true;
            break;
          case SETTING_OPTIONS.LOGOUT:
            authController.logout();
            break;
          default:
        }
      },
    },
    pixelStore: ['chat'],
    template: /* html */ `
      <header class="messanger__header">
        <section class="messanger__header-title">
          <h2 class="header-title__logo">Pixel Chat</h2>
          <img class="header-title__settings" src="${setting}" e:click="methods.settingClickHandler"/>
          <Menu if:truthy="state.isMenu" b:optionClick="methods.optionClick"/>
          <CreateModal if:truthy="state.isChatCreate"/>
        </section>
        
        <div class="messanger__chat-info">
          <div class="chat-info__container">
            <h2 class="chat-info__title">{{props.chat.title}}</h2>
            <img class="header-title__options" src="${options}"/>
          </div>
        </div>

          
      </header>
    `,
  };
}
