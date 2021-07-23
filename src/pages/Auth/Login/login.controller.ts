import { BASE_URLS } from '../../../api';
import { CookieAuthController } from '../../../controllers';
import { FormValidator } from '../../../utils';
import { AUTH_ERRORS, FIELD_TYPE } from '../const';
import { LoginAPI } from './login.api';

const loginApi = new LoginAPI(BASE_URLS.auth);
const cookieAuthAPI = new CookieAuthController();
const validatorConfig = { form: 'formFields', errors: 'errors' };

export class LoginController {
  login = async (data: Record<string, any>) => {
    try {
      const isValid = FormValidator.validate(data, validatorConfig, FIELD_TYPE);

      if (!isValid) {
        throw Error(AUTH_ERRORS.LFNV);
      }

      await loginApi.login(data[validatorConfig.form]);
      await cookieAuthAPI.checkAuth();
    } catch (error) {
      if (error && error.reason) {
        if (error.reason === 'Login or password is incorrect') {
          for (const key in data[validatorConfig.errors]) {
            if (key in data[validatorConfig.errors]) {
              data[validatorConfig.errors][key] = 'Неверные данные';
            }
          }
        }
      }
    }
  };
}
