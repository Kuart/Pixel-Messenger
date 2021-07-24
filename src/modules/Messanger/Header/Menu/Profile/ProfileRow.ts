import { IComponentModel } from '../../../../../utils';

export function ProfileRow(): IComponentModel {
  return {
    template: /* html */ `
      <div class="profile-row">
        <span class="profile-row__title">{{props.title}}</span>
        <div class="profile-row__value">{{props.value}}</div>
      </div>
    `,
  };
}
