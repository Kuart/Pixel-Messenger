import { IComponentModel } from '../../../../../utils';
import { ProfileRow } from './ProfileRow';

export function ProfileInfo(): IComponentModel {
  return {
    components: {
      ProfileRow,
    },
    template: /* html */ `
    <div class="profile__body">
      <ProfileRow title="Почта" b:value="props.user.email" />
      <ProfileRow title="Логин" b:value="props.user.login" />
      <ProfileRow title="Отображаемое имя" b:value="props.user.display_name" />
      <ProfileRow title="Имя" b:value="props.user.first_name" />
      <ProfileRow title="Фамилия" b:value="props.user.second_name" />
      <ProfileRow title="Телефон" b:value="props.user.phone" />
    </div>
    }
  `,
  };
}
