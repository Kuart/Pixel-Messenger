import { chatAPI, WebSocketAPI } from '../api';
import { IChat } from '../modules/Messanger/messanger.type';
import { PixelStore } from '../utils/pixel';

export class ChatController {
  socket: WebSocketAPI = new WebSocketAPI();

  initChat = async (chat: IChat) => {
    const { token } = await chatAPI.getSingle(chat.id);
    const { id } = PixelStore.currentUser;
    this.socket.init(id, chat.id, token);
  };

  resetChat = () => {
    this.socket = new WebSocketAPI();
  };

  createChat = async (data: Record<string, any>) => {
    try {
      if (!data.title.trim()) {
        throw Error('Поле должно быть заполнено');
      }
      const { id } = await chatAPI.create({ title: data.title });
      data.error = '';
      data.title = '';

      const chats = await chatAPI.get();

      PixelStore.dispatch('chats', chats);
      PixelStore.dispatch('filteredChats', chats);
    } catch (error) {
      data.error = 'Поле должно быть заполнено';
    }
  };
}
