import { FormValidator, PixelRouter } from '../../../utils';
import { FIELD_TYPE, AUTH_ERRORS } from '../const';
import { ROUTES } from '../../../routes';
import { authAPI } from '../../../api';
import { AuthController } from '../../../controllers';

const validationConfig = { form: 'formFields', errors: 'errors' };
const authController = new AuthController();
export class RegisterController {
  register = async (data: Record<string, any>) => {
    try {
      const isValid = FormValidator.validate(data, validationConfig, FIELD_TYPE);

      if (!isValid) {
        throw Error(AUTH_ERRORS.RFNV);
      }

      await authAPI.register(data[validationConfig.form]);
      await authController.checkAuth();
      PixelRouter.go(ROUTES.messanger);
    } catch (error) {
      if (error && error.reason) {
        if (error.reason === 'Login already exists') {
          data[validationConfig.errors].login = 'Используйте другой логин';
        }
      } else {
        console.warn(error);
      }
    }
  };
}
