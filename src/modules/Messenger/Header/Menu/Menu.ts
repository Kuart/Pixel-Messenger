import { IComponentModel } from '../../../../utils';
import { SETTING_OPTIONS } from '../../const';

export function Menu(): IComponentModel {
  return {
    template: /* html */ `
    <div class="header__settings" >
      <div class="settings__option" data-name="${SETTING_OPTIONS.PROFILE}" e:click="props.optionClick">Профиль</div>
      
      <div class="settings__option" 
          data-name="${SETTING_OPTIONS.CREATE_CHAT}" 
          e:click="props.optionClick">Создать чат</div>

      <div class="settings__option" data-name="${SETTING_OPTIONS.LOGOUT}" e:click="props.optionClick">Выйти</div>
    </div>
    `,
  };
}
