import { Pixel } from '../..';
import { Button, Input } from '../../components';
import { Modal, defaultModalContext } from '../../components';
import { routs } from '../../utils';
import './Authorization.css';

export function Login(props) {
  Pixel.registerComponent(Modal);
  Pixel.registerComponent(Input);
  Pixel.registerComponent(Button);

  const modalContext = defaultModalContext();
  modalContext.classes.modal = 'modal modal-login';
  modalContext.slots.body = {
    context: {
      formOnChangeHandler,
      submitForm,
      redirectRegister
    },
    template: `
    <form class="auth-form auth-form_login" {{_eventChange=formOnChangeHandler=auth-form_login}} {{_eventSubmit=submitForm=auth-form_login}}>
      <div class="auth-form__body">
        {{@ Input 
          @label=Логин 
          @name=login 
          @eventTarget=login__input-login 
          @id=lgn57
        @}}

        {{@ Input 
          @label=Пароль 
          @type=password 
          @name=password 
          @eventTarget=login__input-password 
          @error=Не правильно введен пароль 
          @id=pasw57
        @}}

      </div>

      <footer class="auth-form__footer">
        {{@ Button 
          @text=Авторизоваться 
          @class=button_accent login__submit  
          @type=submit 
        @}}

        {{@ Button 
          @text=Нет аккаунта? 
          @class=button_transparent login__register 
          @type=button
          @_eventClick=redirectRegister=login__register
        @}}
      </footer>
    </form>`
  };

  const context = {
    ...modalContext,
    ...props
  };

  const template = `{{@ Modal @headerText=Вход @}}`;

  return { template, context, name: 'Login' };
}

function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  for (var pair of formData.entries()) {
    console.log(pair);
  }

  location.hash = routs.messanger;
}

function formOnChangeHandler(event) {
  const { name, value } = event.target;
  console.log(name, value);
}

function redirectRegister(event) {
  event.preventDefault();
  location.hash = routs.register;
}
