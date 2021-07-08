import { BASE_URLS } from '../../../api';
import { FormValidator } from '../../../utils';
import { RegistrationAPI } from './registration.api';
import { FIELD_TYPE, AUTH_ERRORS } from '../const';
import { root } from '../../..';
import { ROUTES } from '../../../routes';

const api = new RegistrationAPI(BASE_URLS.auth);
const validationConfig = { form: 'formFields', errors: 'errors' };

export class RegisterController {
  register = async (data: Record<string, any>) => {
    try {
      const isValid = FormValidator.validate(data, validationConfig, FIELD_TYPE);

      if (!isValid) {
        throw Error(AUTH_ERRORS.RFNV);
      }

      await api.register(data[validationConfig.form]);
      root.router.go(ROUTES.login);
    } catch (error) {
      console.error(error);
    }
  };
}
