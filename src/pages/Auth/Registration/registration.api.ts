import { BaseAPI } from '../../../api/base-api';
import { IRegistrationForm } from '../auth.type';
import { AUTH_SERVICE } from '../const';

export class RegistrationAPI extends BaseAPI {
  register(data: IRegistrationForm) {
    return this.http.post(AUTH_SERVICE.signup, { data });
  }
}
