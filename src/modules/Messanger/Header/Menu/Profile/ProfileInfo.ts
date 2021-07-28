import { IComponentModel } from '../../../../../utils';
import { ProfileRow } from './ProfileRow';
import { UserPhoto } from '../../../../../components';

export function ProfileInfo(): IComponentModel {
  return {
    components: {
      ProfileRow,
      UserPhoto,
    },
    template: /* html */ `
    <div class="profile__body">
      <div class="profile__info-title">
        <UserPhoto b:photo="props.user.avatar" containerClass="profile__avatar-container" />
        <div class="profile__user-container">
          <div class="profile__user-title">
            <span>{{props.user.first_name}}</span>  
            <span>{{props.user.second_name}}</span>
          </div>
          <ProfileRow title="Отображаемое имя" b:value="props.user.display_name" titleClass="low" />
        </div>
      </div>
      <ProfileRow title="Почта" b:value="props.user.email" />
      <ProfileRow title="Логин" b:value="props.user.login" />
      <ProfileRow title="Телефон" b:value="props.user.phone" />
    </div>
    }
  `,
  };
}
