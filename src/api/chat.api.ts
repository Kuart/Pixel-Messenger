import { IUser } from '../interfaces';
import { IChatUserAction } from '../interfaces/IUser';
import { IChat } from '../modules/Messanger/messanger.type';
import { BaseAPI } from './base-api';

class ChatAPI extends BaseAPI {
  get(): Promise<any> {
    return this.http.get('');
  }

  getSingle(id: number): Promise<any> {
    return this.http.post(`/token/${id}`);
  }

  create(data: Record<string, string>): Promise<{ id: number }> {
    return this.http.post('', { data });
  }

  delete(data: Record<string, number>) {
    return this.http.delete('', { data });
  }

  uploadAvatar(data: FormData): Promise<IChat> {
    return this.http.put('/avatar', { isNoHeader: true, data });
  }

  getUsers(id: number): Promise<IUser[]> {
    return this.http.get(`/${id}/users`);
  }

  addUser(data: IChatUserAction) {
    return this.http.put('/users', { data });
  }

  deleteUser(data: IChatUserAction) {
    return this.http.delete('/users', { data });
  }
}

export const chatAPI = new ChatAPI('/chats');
