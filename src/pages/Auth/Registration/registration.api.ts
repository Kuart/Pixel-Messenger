import { BaseAPI } from '../../../api/base-api';
import { IRegistrationForm } from '../auth.type';
import { AUTH } from '../const';

export class RegistrationAPI extends BaseAPI {
  register(data: IRegistrationForm) {
    return this.http.post(AUTH.signup, { data });
  }
}
