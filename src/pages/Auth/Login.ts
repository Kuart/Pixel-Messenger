import { FormValidator, generateUniqId, IComponentModel } from '../../utils';
import { Input, Modal, Button, PagesContainer } from '../../components';
import { ROUTES } from '../..';
import './Auth.css';
import { CustomEventTarget } from '../../types';
import { FIELD_TYPE } from './const';

function Login(): IComponentModel {
  return {
    state: {
      formFields: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
    },
    /* eslint-disable */
    methods: {
      formFocusHandler: function (event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
      },
      formBlurHandler: function (event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
      },
      submitForm: function (event: Event) {
        event.preventDefault();

        const isValid = FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
        if (isValid) {
          window.location.hash = ROUTES.messanger;
        }
      },
      replaceToRegister: function () {
        window.location.hash = ROUTES.register;
      },
      inputHandler: function (event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
      },
    },
    /* eslint-enable */
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
          <form 
            class="auth-form auth-form_login" 
            e:submit="submitForm" 
            e:focus="formFocusHandler" 
            e:blur="formBlurHandler" 
            id="id-login_form">
            <div class="auth-form__body">
              <Input 
                s:label="Логин" 
                s:name="login" 
                s:type="${FIELD_TYPE.login}" 
                s:id="input${generateUniqId()}" 
                b:errors="errors.login"
                b:value="formFields.login"/>

              <Input 
                s:label="Пароль" 
                s:name="${FIELD_TYPE.password}" 
                s:type="password" 
                s:id="input${generateUniqId()}" 
                b:errors="errors.password"
                b:value="formFields.password"/>
            </div>
            <footer class="auth-form__footer">
              <Button 
                s:text="Авторизоваться" 
                class="button button_accent" 
                s:type="button" 
                e:click="submitForm" 
                form="id-login_form"/>
              <Button 
                s:text="Нет аккаунта?" 
                class="button button_transparent" 
                type="button" 
                e:click="replaceToRegister"/>
            </footer>
          </form>
        </div>             
      </section>
    </div>`,
  };
}

export default Login;
