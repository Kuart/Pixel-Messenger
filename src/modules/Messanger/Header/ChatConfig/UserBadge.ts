import { IComponentModel } from '../../../../utils';
import close from '../../../../../static/assets/images/Icon/close.svg';
import './UserBadge.css';

export function UserBadge(): IComponentModel {
  return {
    methods: {
      actionClick() {
        const { id } = this.componentProps;
        this.componentProps.onClick(id);
      },
    },
    template: /* html */ `
      <div class="user-badge__container">
        <img if:falsy="props.role === admin" class="modal-window__close" src="${close}" e:click="methods.actionClick"/>
        <div class="user-badge__title">{{props.login}}</div>
      </div>
    `,
  };
}
