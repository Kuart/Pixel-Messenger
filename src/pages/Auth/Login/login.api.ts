import { BaseAPI } from '../../../api/base-api';
import { AUTH_SERVICE } from '../const';

export class LoginAPI extends BaseAPI {
  login(data: Record<string, string>) {
    return this.http.post(AUTH_SERVICE.signin, { data });
  }

  checkAuth() {
    return this.http.get(AUTH_SERVICE.user);
  }
}
