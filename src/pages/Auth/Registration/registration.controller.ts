import { BASE_URLS } from '../../../api';
import { FormValidator, IValidatorConfig } from '../../../utils';
import { IRegistrationForm } from '../auth.type';
import { RegistrationAPI } from './registration.api';
import { FIELD_TYPE } from '../const';
const api = new RegistrationAPI(BASE_URLS.auth);

const validationConfig = { form: 'formFields', errors: 'errors' };

/* const isValid = FormValidator.validate(this.state, { form: 'formFields', errors: 'errors' }, FIELD_TYPE);
if (isValid) {
  root.router.go(ROUTES.messanger);
} */

/*  prettier-ignore */
const validate = (stateFields:IValidatorConfig, fieldsConfig: Record<string, string | Record<string, string>>) => {
  /* FormValidator.validate('data', stateFields, fieldsConfig); */
  /* console.log(data) */
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(target, propertyKey, descriptor);
  };
}

const handleError = () => {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(target, propertyKey, descriptor);
  };
};

export class RegisterController {
  @validate(validationConfig, FIELD_TYPE)
  @handleError()
  register = async (data: IRegistrationForm) => {
    try {
      console.log(data);
      /* const userID = await api.register(data);
      console.log(userID); */
    } catch (error) {
      console.error(error);
    }
  };
}
