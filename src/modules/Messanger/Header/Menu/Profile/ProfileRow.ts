import { IComponentModel } from '../../../../../utils';

export function ProfileRow(): IComponentModel {
  return {
    template: /* html */ `
      <div class="profile-row">
        <span p:class="profile-row__title profile-row__title_{{props.titleClass}}">{{props.title}}</span>
        <div class="profile-row__value">{{props.value}}</div>
      </div>
    `,
  };
}
