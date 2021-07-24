import { FormValidator, generateUniqId, IComponentModel, PixelRouter } from '../../../utils';
import { Input, Modal, Button } from '../../../components';
import { FIELD_TYPE } from '../const';
import { CustomEventTarget } from '../../../types';
import { ROUTES } from '../../../routes';
import { RegisterController } from './registration.controller';
import '../Auth.css';

const registerController = new RegisterController();
const validConfig = { form: 'formFields', errors: 'errors', ignoreEmpty: true };

function Registration(): IComponentModel {
  return {
    state: {
      formFields: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        passwordRepeat: '',
      },

      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        passwordRepeat: '',
      },
    },
    methods: {
      formFocusHandler() {
        FormValidator.validate(this.state, validConfig, FIELD_TYPE);
      },
      formBlurHandler() {
        FormValidator.validate(this.state, validConfig, FIELD_TYPE);
      },
      submitForm(event: Event) {
        event.preventDefault();
        registerController.register(this.state);
      },
      replaceToLogin() {
        PixelRouter.go(ROUTES.login);
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
          <h2>Регистрация</h2>
        </header>
        <div class="auth__body">
          <form class="auth-form auth-form_login" 
                e:submit="methods.submitForm" 
                e:blur="methods.formBlurHandler" 
                e:focus="methods.formFocusHandler">

            <div class="auth-form__body auth-form__body--register">

              <Input 
                label="Почта" 
                name="email" 
                type="email" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.email"
                b:error="state.errors.email"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Логин" 
                name="login" 
                type="text" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.login"
                b:error="state.errors.login"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Имя" 
                name="first_name" 
                type="text" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.first_name"
                b:error="state.errors.first_name"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Фамилия" 
                name="second_name" 
                type="text" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.second_name"
                b:error="state.errors.second_name"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Телефон" 
                name="phone" 
                type="tel" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.phone"
                b:error="state.errors.phone"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Пароль" 
                name="password" 
                type="password" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.password"
                b:error="state.errors.password"
                b:onChange="methods.inputHandler"
              />

              <Input 
                label="Повторите пароль" 
                name="passwordRepeat" 
                type="password" 
                id="input${generateUniqId()}" 
                b:value="state.formFields.passwordRepeat"
                b:error="state.errors.passwordRepeat"
                b:onChange="methods.inputHandler"
              />
              
            </div>

            <footer class="auth-form__footer">

              <Button 
                text="Войти" 
                class="button_accent" 
                type="submit" 
                b:onClick="methods.submitForm"
              />

              <Button 
                text="Уже есть аккаунт" 
                class="button button_transparent" 
                type="button" 
                b:onClick="methods.replaceToLogin"
              />

            </footer>
          </form>
        </div>              
      </section>
    </div>
    `,
  };
}

export default Registration;
