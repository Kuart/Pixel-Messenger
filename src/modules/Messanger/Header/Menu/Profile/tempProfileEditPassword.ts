import { FormValidator, generateUniqId, IComponentModel } from '../../../../../utils';
import { UserPhoto, Button, Input } from '../../../../../components';
import { CustomEventTarget } from '../../../../../types';
import { FIELD_TYPE_FULL } from './const';
import avatar from '../../../static/assets/images/Icon/ava.png';

export function TempProfileEditPassword(): IComponentModel {
  return {
    state: {
      formFields: {
        email: 'Kuart44@gmail.com',
        login: 'Kuart',
        firstName: 'Денис',
        secondName: 'Денис',
        phoneNumber: '+7 (921) 444 44 44',
        currentPassword: '',
        password: '',
        passwordRepeat: '',
      },
      errors: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phoneNumber: '',
        currentPassword: '',
        password: '',
        passwordRepeat: '',
      },
    },
    /* eslint-disable */
    methods: {
      formFocusHandler: function (event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE_FULL);
      },
      formBlurHandler: function (event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE_FULL);
      },
      submitForm: function (event: Event) {
        event.preventDefault();

        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE_FULL);
      },
      cancel: function (event: Event) {
        event.preventDefault();
      },
      inputHandler: function (event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
      },
    },
    components: {
      UserPhoto,
      Button,
      Input,
    },
    template: /* html */ `
    <section class="profile__container">
      <header class="profile__header">
          <UserPhoto 
            s:containerClass="user-avatar__container_input" s
            :imgClass="user-avatar__img_input" s:photo="${avatar}" />
          <div>
            <h2 class="header__title">Денис</h2>
          </div>
      </header>
      <div class="profile__body">
          <form 
            class="profile-form" 
            e:submit="submitForm" 
            e:focus="formFocusHandler" 
            e:blur="formBlurHandler" 
            id="id-prfole_form2">

            <div class="profile-form__body profile-form__body--full">
              <Input 
              s:label="Почта" 
              s:name="email" 
              s:type="email" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.email"
              s:loginClass="login--shadow"
              b:errors="errors.email"/>

            <Input 
              s:label="Логин" 
              s:name="login" 
              s:type="text" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.login"
              s:loginClass="login--shadow"
              b:errors="errors.login"/>

            <Input 
              s:label="Имя" 
              s:name="firstName" 
              s:type="text" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.firstName"
              s:loginClass="login--shadow"
              b:errors="errors.firstName"/>

            <Input 
              s:label="Фамилия" 
              s:name="secondName" 
              s:type="text" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.secondName"
              s:loginClass="login--shadow"
              b:errors="errors.secondName"/>

            <Input 
              s:label="Телефон" 
              s:name="phoneNumber" 
              s:type="tel" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.phoneNumber"
              s:loginClass="login--shadow"
              b:errors="errors.phoneNumber"/>

            <Button 
              s:text="Отменить изменение пароля" 
              class="button button_text" 
              type="button" 
              s:loginClass="login--shadow"
              e:click="replaceToRegister"/>

            <Input 
              s:label="Действующий пароль" 
              s:name="currentPassword" 
              s:type="password" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.currentPassword"
              s:loginClass="login--shadow"
              b:errors="errors.currentPassword"/>
              
            <Input 
              s:label="Пароль" 
              s:name="password" 
              s:type="password" 
              s:id="input${generateUniqId()}" 
              b:value="formFields.password"
              s:loginClass="login--shadow"
              b:errors="errors.password"/>

            <Input 
              s:label="Повторите пароль" 
              s:name="passwordRepeat" 
              s:type="password" 
              s:loginClass="login--shadow"
              s:id="input${generateUniqId()}" 
              b:value="formFields.passwordRepeat"
              b:errors="errors.passwordRepeat"/>

            </div>
          <footer class="auth-form__footer">
            <Button 
              s:text="Сохранить" 
              class="button button_accent" 
              s:type="button" 
              e:click="submitForm" 
              form="id-login_form"/>
            <Button 
              s:text="Отмена" 
              class="button button_transparent" 
              type="button" 
              e:click="cancel"/>
          </footer>
        </form>
      </div>  
    </section> 
    `,
  };
}
