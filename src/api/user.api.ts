import { BaseAPI } from './base-api';
import { IUser } from '../interfaces';

class UserAPI extends BaseAPI {
  changeProfile(data: IUser): Promise<IUser> {
    return this.http.put('/profile', { data });
  }

  changePassword(data: Record<string, string>): Promise<void> {
    return this.http.put('/password', { data });
  }

  changeAvatar(formData: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', {
      isNoHeader: true,
      data: formData,
    });
  }
}

export const userAPI = new UserAPI('/user');
