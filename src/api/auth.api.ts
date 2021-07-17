import { IUser } from '../pages';
import { BaseAPI } from './base-api';

export class AuthAPI extends BaseAPI {
  getUserData(): Promise<IUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}
