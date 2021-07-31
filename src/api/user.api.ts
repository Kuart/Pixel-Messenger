import { BaseAPI } from './base-api';
import { IUser } from '../interfaces';

class UserAPI extends BaseAPI {
  changeProfile(data: IUser): Promise<IUser> {
    return this.http.put('/profile', { data });
  }

  changePassword(data: Record<string, string>): Promise<void> {
    return this.http.put('/password', { data });
  }

  changeAvatar(formData: FormData): Promise<void> {
    return this.http.put('/profile/avatar', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
}

export const userAPI = new UserAPI('/user');
