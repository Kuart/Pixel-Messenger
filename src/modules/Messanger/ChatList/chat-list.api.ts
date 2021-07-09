import { BaseAPI } from '../../../api/base-api';
import { IChat } from '../messanger.type';

export class ChatListAPI extends BaseAPI {
  getChats(): Promise<IChat[]> {
    return this.http.get('');
  }

  createChat(data: Record<string, string>): Promise<{ id: number }> {
    return this.http.post('', { data });
  }

  deleteChat(data: Record<string, number>) {
    return this.http.delete('', { data });
  }
}
