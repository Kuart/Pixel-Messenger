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
        console.log(this);
        /* FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE); */
      },
      formBlurHandler(event: Event) {
        event.preventDefault();
        console.log(this);
        /* FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE); */
      },
      submitForm(event: Event) {
        event.preventDefault();
        console.log(this);
        /*  loginController.login(this.state); */
      },
      replaceToRegister() {
        /* PixelRouter.go(ROUTES.register); */
      },
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
        console.warn(this.state);
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
            e:submit="methods.submitForm" 
            e:focus="methods.formFocusHandler" 
            e:blur="methods.formBlurHandler" 
            id="${loginFormId}"
            >
            <div class="auth-form__body">
              <Input 
                label="Логин" 
                name="login" 
                type="${FIELD_TYPE.login}" 
                id="input${generateUniqId()}" 
                b:error="state.errors.login"
                b:value="state.formFields.login" 
                b:onChange="methods.inputHandler"
                />

              <Input 
                label="Пароль" 
                name="${FIELD_TYPE.password}" 
                type="password" 
                id="input${generateUniqId()}" 
                b:error="state.errors.password"
                b:value="state.formFields.password"
                b:onChange="methods.inputHandler"
                />
            </div>
            <footer class="auth-form__footer">
              <Button 
                text="Авторизоваться" 
                class="button_accent" 
                type="button" 
                b:onClick="methods.submitForm" 
                form="${loginFormId}"
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
