import { IComponentModel } from '../../utils';
import './UserPhoto.css';

export function UserPhoto(): IComponentModel {
  return {
    template: /* html */ `
    <div p:class="user-avatar__container {{props.containerClass}}">
      <img p:src="photo" p:class="user-avatar__img {{props.imgClass}}" />
    </div>>
    `,
  };
}
