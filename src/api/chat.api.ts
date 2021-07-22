import { BaseAPI } from './base-api';
import { IChat } from '../modules';

export class ChatAPI extends BaseAPI {
  getChats(): Promise<any> {
    return this.http.get('');
  }

  createChat(data: Record<string, string>): Promise<{ id: number }> {
    return this.http.post('', { data });
  }

  deleteChat(data: Record<string, number>) {
    return this.http.delete('', { data });
  }
}
