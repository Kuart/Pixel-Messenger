import { IUser } from '../pages';
import { BaseAPI } from './base-api';

export class CookieAuthAPI extends BaseAPI {
  getUserData(): Promise<IUser> {
    return this.http.get('/user');
  }
}
