import { IComponentModel } from '../../../utils';
import { AuthController } from '../../../controllers';
import './Header.css';

const authController = new AuthController();

export function Menu(): IComponentModel {
  return {
    methods: {
      logout() {
        authController.logout();
      },
      openProfile() {
        console.log('createChat');
      },
    },
    usedProps: ['settingsClass'],
    template: /* html */ `
    <div p:class="settingsClass" >
      <div class="settings__option" e:click="openProfile">Профиль</div>
      <div class="settings__option" e:click="openChatModal">Создать чат</div>
      <div class="settings__option" e:click="logout">Выйти</div>
    </div>
    `,
  };
}
