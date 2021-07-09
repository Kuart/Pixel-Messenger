import { BaseAPI } from './base-api';

export class CookieAuthAPI extends BaseAPI {
  checkAuth(): Promise<any> {
    return this.http.get('/user');
  }
}
