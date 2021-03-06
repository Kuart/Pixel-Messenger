import { FormValidator, IComponentModel, PixelRouter } from '@/utils';
import { Input, Modal, Button } from '@/components';
import { CustomEventTarget } from '@/interfaces';
import { LOGIN_FIELD_TYPE } from '../const';
import { ROUTES } from '../../../routes';
import { LoginController } from './login.controller';
import '../Auth.css';

const loginController = new LoginController();

const validConfig = { form: 'formFields', errors: 'errors' };

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
    methods: {
      formFocusHandler() {
        FormValidator.validate(this.state, validConfig, LOGIN_FIELD_TYPE);
      },
      formBlurHandler() {
        FormValidator.validate(this.state, validConfig, LOGIN_FIELD_TYPE);
      },
      submitForm(event: Event) {
        event.preventDefault();
        loginController.login(this.state);
      },
      replaceToRegister(event: Event) {
        event.preventDefault();
        PixelRouter.go(ROUTES.register);
      },
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
      },
    },
    components: {
      Modal,
      Input,
      Button,
    },
    template: /* html */ `
    <div class="container">
      <section class="auth">
        <header class="auth__header">
          <h2>Вход</h2>
        </header>
        <div class="auth__body">
          <form 
            class="auth-form auth-form_login" 
            e:submit="methods.submitForm" 
            e:focus="methods.formFocusHandler" 
            e:blur="methods.formBlurHandler" 
          >
            <div class="auth-form__body">
              <Input 
                label="Логин" 
                name="login" 
                type="${LOGIN_FIELD_TYPE.login}" 
                id="login_input_login" 
                b:error="state.errors.login"
                b:value="state.formFields.login" 
                b:onChange="methods.inputHandler"
                />

              <Input 
                label="Пароль" 
                name="${LOGIN_FIELD_TYPE.password}" 
                type="password" 
                id="login_input_password" 
                b:error="state.errors.password"
                b:value="state.formFields.password"
                b:onChange="methods.inputHandler"
                />
            </div>
            <footer class="auth-form__footer">
              <Button 
                text="Авторизоваться" 
                class="button_accent" 
                type="submit" 
                b:onClick="methods.submitForm" 
              />

              <Button 
                text="Нет аккаунта?" 
                class="button_transparent" 
                type="button" 
                b:onClick="methods.replaceToRegister"
              />
            </footer>
          </form>
        </div>             
      </section>
    </div>`,
  };
}

export default Login;
