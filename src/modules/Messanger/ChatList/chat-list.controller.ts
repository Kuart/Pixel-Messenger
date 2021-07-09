import { BASE_URLS } from '../../../api';
import { ChatListAPI } from './chat-list.api';
import { PixelStore } from '../../../utils';
import { IChat } from '../messanger.type';

const chatListAPI = new ChatListAPI(BASE_URLS.chats);

export class ChatListController {
  getChats = async () => {
    try {
      const chats = await chatListAPI.getChats();
      PixelStore.dispatch('chats', chats);
      PixelStore.dispatch('filteredChats', chats);
    } catch (error) {
      console.error(error);
    }
  };

  createChat = async (title: string) => {
    try {
      const { id } = await chatListAPI.createChat({ title });
      console.warn(id);
    } catch (error) {
      console.error(error);
    }
  };

  deleteChat = async (chatId: number) => {
    try {
      await chatListAPI.deleteChat({ chatId });
    } catch (error) {
      console.error(error);
    }
  };

  filterChats = (filter: string) => {
    PixelStore.dispatch(
      'filteredChats',
      PixelStore.store.chats.filter((chat: IChat) => chat.title.indexOf(filter) !== -1)
    );
  };
}
