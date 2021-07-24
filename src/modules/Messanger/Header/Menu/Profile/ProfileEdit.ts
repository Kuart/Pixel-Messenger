import { IComponentModel } from '../../../../../utils';
import { Input, Button } from '../../../../../components';

export function ProfileEdit(): IComponentModel {
  const profileForm = 'id-profile_form';
  return {
    state: {
      isPasswordEdit: false,
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
      submitForm() {},
      formFocusHandler() {},
      formBlurHandler() {},
      inputHandler() {},
      changePassword() {
        this.state.isPasswordEdit = !this.state.isPasswordEdit;
      },
    },
    components: {
      Input,
      Button,
    },
    template: /* html */ `
    <div class="profile__body">
      <form 
        class="profile-form" 
        e:submit="methods.submitForm" 
        e:focus="methods.formFocusHandler" 
        e:blur="methods.formBlurHandler" 
        id="${profileForm}" >

        <div class="profile-form__body">
          <Input 
            label="Почта" 
            name="email" 
            type="email" 
            id="profile_mail" 
            b:value="props.user.email"
            loginClass="login--shadow"
            b:error="state.errors.email"
            b:onChange="methods.inputHandler"
          />

          <Input 
            label="Логин" 
            name="login" 
            type="text" 
            id="profile_login" 
            b:value="props.user.login"
            loginClass="login--shadow"
            b:error="state.errors.login"
            b:onChange="methods.inputHandler"
          />

          <Input 
            label="Имя" 
            name="firstName" 
            type="text" 
            id="profile_firstName" 
            b:value="props.user.first_name"
            loginClass="login--shadow"
            b:error="state.errors.first_name"
            b:onChange="methods.inputHandler"
          />

          <Input 
            label="Фамилия" 
            name="secondName" 
            type="text" 
            id="profile_secondName" 
            b:value="props.user.second_name"
            loginClass="login--shadow"
            b:error="state.errors.second_name"
            b:onChange="methods.inputHandler"
          />

          <Input 
            label="Телефон" 
            name="phoneNumber" 
            type="tel" 
            id="profile_phoneNumber" 
            b:value="props.user.phone"
            loginClass="login--shadow"
            b:error="state.errors.phone"
            b:onChange="methods.inputHandler"
          />
          <span e:click="methods.changePassword">Изменить пароль</span>

          <div>
            <Input 
              label="Пароль" 
              name="password" 
              type="password" 
              id="profile_current_password" 
              b:value="state.formFields.password"
              b:error="state.errors.password"
              b:onChange="methods.inputHandler"
            />

            <Input 
              label="Пароль" 
              name="password" 
              type="password" 
              id="profile_next_password" 
              b:value="state.formFields.password"
              b:error="state.errors.password"
              b:onChange="methods.inputHandler"
            />

            <Input 
              label="Повторите пароль" 
              name="passwordRepeat" 
              type="password" 
              id="profile_repeat_password" 
              b:value="state.formFields.passwordRepeat"
              b:error="state.errors.passwordRepeat"
              b:onChange="methods.inputHandler"
            />
          </div>
        </div>
        <footer class="auth-form__footer">
          <Button 
            text="Сохранить" 
            class="button_accent" 
            type="button" 
            form="${profileForm}"
            b:onClick="methods.submitForm" 
          />

          <Button 
            text="Отмена" 
            class="button_transparent" 
            type="button" 
            b:onClick="methods.submitForm"
          />
        </footer>
      </form>
    </div>  
    `,
  };
}
