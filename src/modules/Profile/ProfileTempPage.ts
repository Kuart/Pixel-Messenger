import { IComponentModel } from '../../utils';
import { Profile } from './Profile';
import { TempProfileEdit } from './tempProfileEdit';
import { TempProfileEditPassword } from './tempProfileEditPassword';
import './Profile.css';

export function ProfileTempPage(): IComponentModel {
  return {
    components: {
      Profile,
      TempProfileEdit,
      TempProfileEditPassword,
    },
    template: /* html */ `
    <div class="container">
      <div class="temp_container">
        <Profile />
        <TempProfileEdit />
        <TempProfileEditPassword />
      </div>
    </div>
    `,
  };
}
