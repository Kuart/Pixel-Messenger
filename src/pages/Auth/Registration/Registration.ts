import { FormValidator, generateUniqId, IComponentModel, PixelRouter } from '../../../utils';
import { Input, Modal, Button } from '../../../components';
import { FIELD_TYPE } from '../const';
import { CustomEventTarget } from '../../../types';
import { ROUTES } from '../../../routes';
import { RegisterController } from './registration.controller';
import '../Auth.css';

const registerController = new RegisterController();

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
      <section class="modal">
        <header class="modal__header">
          <h2>Регистрация</h2>
        </header>
        <div class="modal__body">
          <form class="auth-form auth-form_login" 
                e:submit="submitForm" 
                e:blur="formBlurHandler" 
                e:focus="formFocusHandler">
            <div class="auth-form__body auth-form__body--register">
              <Input 
                s:label="Почта" 
                s:name="email" 
                s:type="email" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.email"
                b:errors="errors.email"/>

              <Input 
                s:label="Логин" 
                s:name="login" 
                s:type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.login"
                b:errors="errors.login"/>

              <Input 
                s:label="Имя" 
                s:name="first_name" 
                s:type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.first_name"
                b:errors="errors.first_name"/>

              <Input 
                s:label="Фамилия" 
                s:name="second_name" 
                s:type="text" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.second_name"
                b:errors="errors.second_name"/>

              <Input 
                s:label="Телефон" 
                s:name="phone" 
                s:type="tel" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.phone"
                b:errors="errors.phone"/>

              <Input 
                s:label="Пароль" 
                s:name="password" 
                s:type="password" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.password"
                b:errors="errors.password"/>

              <Input 
                s:label="Повторите пароль" 
                s:name="passwordRepeat" 
                s:type="password" 
                s:id="input${generateUniqId()}" 
                b:value="formFields.passwordRepeat"
                b:errors="errors.passwordRepeat"/>
              
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
