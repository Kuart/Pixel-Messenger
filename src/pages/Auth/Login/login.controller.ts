import { root } from '../../..';
import { BASE_URLS } from '../../../api';
import { ROUTES } from '../../../routes';
import { FormValidator } from '../../../utils';
import { AUTH_ERRORS, FIELD_TYPE } from '../const';
import { LoginAPI } from './login.api';

const loginApi = new LoginAPI(BASE_URLS.auth);
const validatorConfig = { form: 'formFields', errors: 'errors' };

export class LoginController {
  login = async (data: Record<string, any>) => {
    try {
      const isValid = FormValidator.validate(data, validatorConfig, FIELD_TYPE);

      if (!isValid) {
        throw Error(AUTH_ERRORS.LFNV);
      }
      const userID = await loginApi.login(data[validatorConfig.form]);

      root.router.go(ROUTES.messanger);
    } catch (error) {
      console.error(error);
    }
  };

  autoLogin = async () => {
    try {
      const userID = await loginApi.checkAuth();

      root.router.go(ROUTES.messanger);
    } catch (error) {
      console.error(error);
    }
  };
}
