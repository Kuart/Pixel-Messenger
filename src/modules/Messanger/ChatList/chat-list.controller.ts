import { chatAPI } from '../../../api';
import { PixelStore } from '../../../utils';
import { IChat } from '../messanger.type';

export class ChatListController {
  getChats = async () => {
    try {
      const chats = await chatAPI.get();
      PixelStore.dispatch('chats', chats);
      PixelStore.dispatch('filteredChats', chats);
    } catch (error) {
      console.error(error);
    }
  };

  createChat = async (title: string) => {
    try {
      const { id } = await chatAPI.create({ title });
      console.warn(id);
    } catch (error) {
      console.error(error);
    }
  };

  deleteChat = async (chatId: number) => {
    try {
      await chatAPI.delete({ chatId });
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

  selectChat = (chatId: number) => {
    PixelStore.dispatch(
      'selectedChat',
      PixelStore.store.chats.find((chat: IChat) => chat.id === chatId)
    );
  };
}
