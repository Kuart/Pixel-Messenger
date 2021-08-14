import { IComponentModel } from '../../utils';
import noImg from '../../../static/assets/images/Icon/no_img.png';
import './UserPhoto.css';

export function UserPhoto(): IComponentModel {
  return {
    template: /* html */ `
    <div p:class="user-avatar__container {{props.containerClass}}">
      <img if:truthy="props.photo" 
        p:src="https://ya-praktikum.tech/api/v2/resources/{{props.photo}}" 
        p:class="user-avatar__img {{props.imgClass}}" />
      <img if:falsy="props.photo" src="${noImg}" p:class="user-avatar__img {{props.imgClass}}" />

      <label if:truthy="props.inputId" p:for="inputId" class="user-avatar__overlay"></label>
      <input if:truthy="props.inputId" 
        type="file" 
        name="avatar" 
        accept="image/*"
        e:change="props.onChange"
        class="user-avatar__input" 
        p:id="inputId"
      />
    </div>
    `,
  };
}
