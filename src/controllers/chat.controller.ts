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

  getChats = async () => {
    try {
      const chats = await chatAPI.get();
      PixelStore.dispatch('chats', []);
      PixelStore.dispatch('filteredChats', []);

      setTimeout(() => {
        PixelStore.dispatch('chats', chats);
        PixelStore.dispatch('filteredChats', chats);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  createChat = async (data: Record<string, any>) => {
    try {
      if (!data.title.trim()) {
        throw Error('Поле должно быть заполнено');
      }
      const { id } = await chatAPI.create({ title: data.title });
      data.error = '';
      data.title = '';

      this.getChats();
    } catch (error) {
      data.error = 'Поле должно быть заполнено';
    }
  };
}
