import { messagesController } from '.';
import { chatAPI } from '../api';
import { PixelStore } from '../utils/pixel';

export class ChatController {
  getChats = async () => {
    try {
      const chats = await chatAPI.get();
      messagesController.init(chats);

      PixelStore.dispatch('chats', []);

      setTimeout(() => {
        PixelStore.dispatch('chats', messagesController.chats);
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

      await chatAPI.create({ title: data.title });

      data.error = '';
      data.title = '';

      await this.getChats();
    } catch (error) {
      data.error = 'Поле должно быть заполнено';
    }
  };
}
