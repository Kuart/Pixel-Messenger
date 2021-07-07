import { BaseAPI } from '../../../api/base-api';
import { AUTH } from '../const';

export class LoginAPI extends BaseAPI {
  login(loginForm: Record<string, string>) {
    return this.http.post(AUTH.signin, loginForm);
  }

  checkAuth() {
    return this.http.get(AUTH.user);
  }
}
