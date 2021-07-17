import { FormValidator, generateUniqId, IComponentModel, PixelRouter } from '../../../utils';
import { Input, Modal, Button, PagesContainer } from '../../../components';
import { CustomEventTarget } from '../../../types';
import { FIELD_TYPE } from '../const';
import { ROUTES } from '../../../routes';
import { LoginController } from './login.controller';
import '../Auth.css';

const loginController = new LoginController();

function Login(): IComponentModel {
  const loginFormId = 'id-login_form';
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
    methods: {
      formFocusHandler(event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
      },
      formBlurHandler(event: Event) {
        event.preventDefault();
        FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
      },
      submitForm(event: Event) {
        event.preventDefault();
        loginController.login(this.state);
      },
      replaceToRegister() {
        PixelRouter.go(ROUTES.register);
      },
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
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
          <form 
            class="auth-form auth-form_login" 
            e:submit="submitForm" 
            e:focus="formFocusHandler" 
            e:blur="formBlurHandler" 
            id="${loginFormId}">
            <div class="auth-form__body">
              <Input 
                label="Логин" 
                name="login" 
                type="${FIELD_TYPE.login}" 
                id="input${generateUniqId()}" 
                b:errors="state.errors.login"
                b:value="state.formFields.login" />

              <Input 
                label="Пароль" 
                name="${FIELD_TYPE.password}" 
                type="password" 
                id="input${generateUniqId()}" 
                b:errors="state.errors.password"
                b:value="state.formFields.password"/>
            </div>
            <footer class="auth-form__footer">
              <Button 
                text="Авторизоваться" 
                class="button button_accent" 
                type="button" 
                e:click="submitForm" 
                form="${loginFormId}"/>
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
