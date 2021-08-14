import { FormValidator, IComponentModel } from '../../../../../utils';
import { Input, Button, UserPhoto } from '../../../../../components';
import { CustomEventTarget } from '../../../../../interfaces';
import { FIELD_TYPE, FIELD_TYPE_FULL } from './const';
import { ProfileEditController } from './profile-edit.controller';

const validConfig = { form: 'formFields', errors: 'errors' };
const profileEditController = new ProfileEditController();

export function ProfileEdit(): IComponentModel {
  const profileForm = 'id-profile_form';
  return {
    state: {
      isPasswordEdit: false,
      formFields: {
        avatar: '',
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        passwordRepeat: '',
      },

      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        passwordRepeat: '',
      },
    },
    methods: {
      formFocusHandler() {
        const type = this.state.isPasswordEdit ? FIELD_TYPE_FULL : FIELD_TYPE;
        FormValidator.validate(this.state, validConfig, type);
      },
      formBlurHandler() {
        const type = this.state.isPasswordEdit ? FIELD_TYPE_FULL : FIELD_TYPE;
        FormValidator.validate(this.state, validConfig, type);
      },
      submitForm(event: Event) {
        event.preventDefault();
        profileEditController.update(this);
      },
      inputHandler(event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        this.state.formFields[name] = value;
      },
      changePassword(event: Event) {
        event.preventDefault();
        this.state.isPasswordEdit = !this.state.isPasswordEdit;
      },
      handlePhotoChange(event: Event) {
        event.preventDefault();
        profileEditController.updateAvatar(event, this);
      },
    },
    components: {
      Input,
      Button,
      UserPhoto,
    },
    componentDidMount() {
      const { user } = this.componentProps;

      for (const key in user) {
        if (key in this.state.formFields) {
          this.state.formFields[key] = user[key];
        }
      }
    },
    template: /* html */ `
      <form 
        class="profile-form" 
        e:submit="methods.submitForm" 
        e:focus="methods.formFocusHandler" 
        e:blur="methods.formBlurHandler" 
        id="${profileForm}" >

        <div class="profile-form__body">
          <div class="profile-form__row">
            <UserPhoto 
              b:photo="state.formFields.avatar" 
              containerClass="profile__avatar-container profile__avatar-container_edit" 
              inputId="profile_change_photo"
              b:onChange="methods.handlePhotoChange"
            />

            <div class="profile-form__column">
              <div class="profile-form__row">
                <Input 
                  label="Имя" 
                  name="first_name" 
                  type="text" 
                  id="profile_firstName" 
                  b:value="state.formFields.first_name"
                  loginClass="login--shadow"
                  b:error="state.errors.first_name"
                  b:onChange="methods.inputHandler"
                />

                <Input 
                  label="Фамилия" 
                  name="second_name" 
                  type="text" 
                  id="profile_secondName" 
                  b:value="state.formFields.second_name"
                  loginClass="login--shadow"
                  b:error="state.errors.second_name"
                  b:onChange="methods.inputHandler"
                />
              </div>

              <Input 
                label="Отображаемое имя" 
                name="display_name" 
                type="text" 
                id="profile_display_name" 
                b:value="state.formFields.display_name"
                loginClass="login--shadow"
                b:error="state.errors.display_name"
                b:onChange="methods.inputHandler"
              />
            </div>
            
          </div>

          <div class="profile-form__row">
            <Input 
              label="Почта" 
              name="email" 
              type="email" 
              id="profile_mail" 
              b:value="state.formFields.email"
              loginClass="login--shadow"
              b:error="state.errors.email"
              b:onChange="methods.inputHandler"
            />

            <Input 
              label="Логин" 
              name="login" 
              type="text" 
              id="profile_login" 
              b:value="state.formFields.login"
              loginClass="login--shadow"
              b:error="state.errors.login"
              b:onChange="methods.inputHandler"
            />
          </div>

          <div class="profile-form__row profile-form__row_half-width">
            <Input 
              label="Телефон" 
              name="phone" 
              type="tel" 
              id="profile_phoneNumber" 
              b:value="state.formFields.phone"
              loginClass="login--shadow"
              b:error="state.errors.phone"
              b:onChange="methods.inputHandler"
            />
          </div>
        

          <span class="button_text button_separator" e:click="methods.changePassword">Изменить пароль</span>

          <div if:truthy="state.isPasswordEdit" class="profile-form__body">
            <div class="profile-form__row profile-form__row_half-width">
              <Input 
                label="Пароль" 
                name="oldPassword" 
                type="password" 
                id="profile_current_password" 
                b:value="state.formFields.oldPassword"
                b:error="state.errors.oldPassword"
                b:onChange="methods.inputHandler"
              />
            </div>
            
            <div class="profile-form__row">
              <Input 
                label="Новый Пароль" 
                name="newPassword" 
                type="password" 
                id="profile_next_password" 
                b:value="state.formFields.newPassword"
                b:error="state.errors.newPassword"
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
        </div>

        <footer class="auth-form__footer">
          <Button 
            text="Сохранить" 
            class="button_accent" 
            type="submit" 
            form="${profileForm}"
            b:onClick="methods.submitForm" 
          />
        </footer>
      </form>
    `,
  };
}
