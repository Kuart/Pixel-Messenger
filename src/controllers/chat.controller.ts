import { BASE_URLS, ChatAPI } from '../api';
import { PixelStore } from '../utils/pixel';

const chatController = new ChatAPI(BASE_URLS.chats);

export class ChatController {
  createChat = async (data: Record<string, any>) => {
    try {
      if (!data.title.trim()) {
        throw Error('Поле должно быть заполнено');
      }
      const { id } = await chatController.createChat({ title: data.title });
      data.error = '';
      data.title = '';

      const chats = await chatController.getChats();

      PixelStore.dispatch('chats', chats);
      PixelStore.dispatch('filteredChats', chats);
    } catch (error) {
      data.error = 'Поле должно быть заполнено';
    }
  };

  deleteChat = async (chatId: number) => {
    try {
      await chatController.deleteChat({ chatId });
    } catch (error) {
      console.error(error);
    }
  };
}
