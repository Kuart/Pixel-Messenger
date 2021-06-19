import { IComponentModel } from '../../utils';
import './UserPhoto.css';

export function UserPhoto(): IComponentModel {
  return {
    template: /* html */ `
    <div p:class="user-avatar__container {containerClass}">
      <img p:src="photo" p:class="user-avatar__img {imgClass}" />
    </div>>
    `,
  };
}
