import { generateUniqId, IComponentModel } from '../../utils';
import { Input, Modal, Button } from '../../components';
import './Auth.css';
import { ROUTES } from '../..';
import { CustomEventTarget } from '../../types';

function Registration(): IComponentModel {
  return {
    state: {
      formFields: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phoneNumber: '',
        password: '',
        passwordRepeat: '',
      },
    },
    methods: {
      formFocusHandler: function (event: Event) {
        event.preventDefault();
        console.log(event);
      },
      formBlurHandler: function (event: Event) {
        event.preventDefault();
        console.log(event);
      },
      submitForm: function (event: Event) {
        event.preventDefault();
        window.location.hash = ROUTES.messanger;
        console.log(event);
      },
      replaceToLogin: function () {
        window.location.hash = ROUTES.login;
      },
      inputHandler: function (event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        console.log(`Field: ${name}, Value: ${value}`);
      },
    },
    components: {
      Modal,
      Input,
      Button,
    },
    template: /* html */ `
    <div class="container">
      <section class="modal">
        <header class="modal__header">
          <h2>Регистрация</h2>
        </header>
        <div class="modal__body">
          <form class="auth-form auth-form_login" e:submit="submitForm" e:blur="formBlurHandler" e:focus="formFocusHandler">
            <div class="auth-form__body">
              <Input 
                s:label="Почта" 
                name="email" 
                type="email" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.email"/>

              <Input 
                s:label="Логин" 
                name="login" 
                type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.login"/>

              <Input 
                s:label="Имя" 
                name="firstName" 
                type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.firstName"/>

              <Input 
                s:label="Фамилия" 
                name="secondName" 
                type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.secondName"/>

              <Input 
                s:label="Телефон" 
                name="phoneNumber" 
                type="tel" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.phoneNumber"/>

              <Input 
                s:label="Пароль" 
                name="password" 
                type="password" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.password"/>

              <Input 
                s:label="Повторите пароль" 
                name="passwordRepeat" 
                type="password" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.passwordRepeat"/>

            </div>
            <footer class="auth-form__footer">
              <Button s:text="Войти" class="button button_accent" type="submit" e:click="submitForm"/>
              <Button 
                s:text="Уже есть аккаунт" 
                class="button button_transparent" 
                type="button" 
                e:click="replaceToLogin"/>
            </footer>
          </form>
        </div>              
      </section>
    </div>
    `,
  };
}

export default Registration;
