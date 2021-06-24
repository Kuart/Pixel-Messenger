import { IComponentModel } from '../../utils';
import { UserPhoto, Button } from '../../components';
import { ProfileRow } from './ProfileRow';
import avatar from '../../../static/assets/images/Icon/ava.png';

export function Profile(): IComponentModel {
  return {
    state: {
      currentUser: {
        email: 'Kuart44@gmail.com',
        login: 'Kuart',
        firstName: 'Денис',
        secondName: 'Денис',
        phoneNumber: '+7 (921) 444 44 44',
      },
    },
    components: {
      UserPhoto,
      Button,
      ProfileRow,
    },
    template: /* html */ `
    <section class="profile__container">
      <header class="profile__header">
          <UserPhoto 
            s:containerClass="user-avatar__container_input" s
            :imgClass="user-avatar__img_input" s:photo="${avatar}" />
          <div>
            <h2 class="header__title">Денис</h2>
            <Button 
              s:text="Изменить профиль" 
              class="button button_text" 
              type="button" 
              e:click="replaceToRegister"/>
          </div>
      </header>
      <div class="profile__body">
        <ProfileRow s:title="Почта" b:value="currentUser.email" />
        <ProfileRow s:title="Логин" b:value="currentUser.login" />
        <ProfileRow s:title="Имя" b:value="currentUser.firstName" />
        <ProfileRow s:title="Фамилия" b:value="currentUser.secondName" />
        <ProfileRow s:title="Телефон" b:value="currentUser.phoneNumber" />
      </div>  
    </section> 
    `,
  };
}
