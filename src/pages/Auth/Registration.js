import { Pixel } from '../..';
import { Button, defaultModalContext, Input, Modal } from '../../components';
import { routs } from '../../utils';
import './Authorization.css';

export function Registration(props) {
  Pixel.registerComponent(Modal);
  Pixel.registerComponent(Input);
  Pixel.registerComponent(Button);

  const modalContext = defaultModalContext();
  modalContext.classes.modal = 'modal modal-auth';
  modalContext.slots.body = {
    context: {
      formOnChangeHandler,
      submitForm,
      redirectLogin,
      inputs: [
        { label: 'Почта', type: 'email', name: 'email' },
        { label: 'Логин', type: 'text', name: 'login' },
        { label: 'Имя', type: 'text', name: 'name' },
        { label: 'Фамилия', type: 'text', name: 'secondName' },
        { label: 'Телефон', type: 'tel', name: 'phoneNumber' },
        { label: 'Пароль', type: 'password', name: 'password' },
        { label: 'Повторите пароль', type: 'password', name: 'passwordCheck' }
      ]
    },
    template: `
    <form class="auth-form auth-form_register" {{_eventChange=formOnChangeHandler=auth-form_register}} {{_eventSubmit=submitForm=auth-form_register}}>
      <div class="auth-form_body">
        {{# @inputs @Input @inputType=input #}}
      </div>

      <footer class="auth-form__footer">
        {{@ Button @text=Зарегистрироваться @class=button_accent register__submit @type=submit  @}}

        {{@ Button 
          @text=Войти 
          @class=button_transparent register-login 
          @type=button 
          @_eventClick=redirectLogin=register-login
        @}}
      </footer>
    </form>`
  };

  const context = {
    ...modalContext,
    ...props
  };

  const template = `{{@ Modal @headerText=Регистрация @}}`;

  return { template, context, name: 'Registration' };
}

function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  for (var pair of formData.entries()) {
    console.log(pair);
  }
}

function formOnChangeHandler(event) {
  const { name, value } = event.target;
  console.log(name, value);
}

function redirectLogin(event) {
  event.preventDefault();
  location.hash = routs.login;
}
