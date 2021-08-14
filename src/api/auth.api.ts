import { IUser } from '../pages';
import { IRegistrationForm } from '../pages/Auth/auth.type';
import { BaseAPI } from './base-api';

class AuthAPI extends BaseAPI {
  getUserData(): Promise<IUser> {
    return this.http.get('/user');
  }

  register(data: IRegistrationForm) {
    return this.http.post('/signup', { data });
  }

  login(data: Record<string, string>) {
    return this.http.post('/signin', { data });
  }

  logout() {
    return this.http.post('/logout');
  }
}

export const authAPI = new AuthAPI('/auth');
