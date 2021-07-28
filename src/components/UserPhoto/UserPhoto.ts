import { IComponentModel } from '../../utils';
import noImg from '../../../static/assets/images/Icon/no_img.png';
import './UserPhoto.css';

export function UserPhoto(): IComponentModel {
  return {
    template: /* html */ `
    <div p:class="user-avatar__container {{props.containerClass}}">
      <img if:truthy="props.photo" p:src="props.photo" p:class="user-avatar__img {{props.imgClass}}" />
      <img if:falsy="props.photo" src="${noImg}" p:class="user-avatar__img {{props.imgClass}}" />
      <label if:truthy="props.inputId" for="props.inputId" class="user-avatar__overlay"></label>
      <input if:truthy="props.inputId" 
        e:change="props.onChange" 
        type="file" 
        class="user-avatar__input" 
        id="props.inputId"
      />
    </div>
    `,
  };
}
