import { IComponentModel } from '../../utils';
import './UserPhoto.css';

export function UserPhoto(): IComponentModel {
  return {
    usedProps: ['containerClass', 'photo', 'imgClass'],
    template: /* html */ `
    <div p:class="user-avatar__container {{containerClass}}">
      <img p:src="photo" p:class="user-avatar__img {{imgClass}}" />
    </div>>
    `,
  };
}
