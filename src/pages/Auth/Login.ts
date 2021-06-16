import { generateUniqId, IComponentModel } from '../../utils';
import { Input, Modal, Button } from '../../components';
import './Auth.css';

function Login(): IComponentModel {
  return {
    state: {
      formFields: {
        login: '',
        password: '',
      },
    },
    methods: {
      submitForm: (event: Event) => {
        event.preventDefault();
        console.log(event);
      },
      register: (event: Event) => {
        console.log(event);
      },
      inputHandler: (event: Event) => {
        console.log(event.target.name);
      },
    },
    components: {
      Modal,
      Input,
      Button,
    },
    template: /* html */ `
    <section class="modal">
      <header class="modal__header">
        <h2>Вход</h2>
      </header>
      <div class="modal__body">
        <form class="auth-form auth-form_login" e:submit="submitForm">
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
            <Button s:text="Нет аккаунта?" class="button button_transparent" type="button" e:click="register"/>
          </footer>
        </form>
      </div>              
    </section>`,
  };
}

export default Login;
