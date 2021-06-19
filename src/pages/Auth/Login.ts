import { generateUniqId, IComponentModel } from '../../utils';
import { Input, Modal, Button, PagesContainer } from '../../components';
import { ROUTES } from '../..';
import './Auth.css';
import { CustomEventTarget } from '../../types';

function Login(): IComponentModel {
  return {
    state: {
      formFields: {
        login: '',
        password: '',
      },
      item: '',
    },
    methods: {
      formFocusHandler: function (event: Event) {
        event.preventDefault();
        console.log('f', event);
      },
      formBlurHandler: function (event: Event) {
        event.preventDefault();
        console.log('b', event);
      },
      submitForm: function (event: Event) {
        event.preventDefault();
        window.location.hash = ROUTES.messanger;
      },
      replaceToRegister: function () {
        window.location.hash = ROUTES.register;
      },
      inputHandler: function (event: CustomEventTarget<HTMLInputElement>) {
        this.state.formFields.login = event.target.value;
      },
    },
    components: {
      Modal,
      PagesContainer,
      Input,
      Button,
    },
    template: /* html */ `
    <div class="container">
      <section class="modal">
        <header class="modal__header">
          <h2>Вход</h2>
        </header>
        <div class="modal__body">
          <form class="auth-form auth-form_login" e:submit="submitForm" e:focus="formFocusHandler" e:blur="formBlurHandler">
            <div class="auth-form__body">
              <Input 
                s:label="Логин" 
                name="login" 
                type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.login"/>

              <Input 
                s:label="Пароль" 
                name="password" 
                type="password" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.password"/>
            </div>
            <footer class="auth-form__footer">
              <Button s:text="Авторизоваться" class="button button_accent" type="submit" e:click="submitForm"/>
              <Button s:text="Нет аккаунта?" class="button button_transparent" type="button" e:click="replaceToRegister"/>
            </footer>
          </form>
        </div>             
      </section>
    </div>`,
  };
}

export default Login;
