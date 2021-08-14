import { chatAPI } from '../../../api';
import { PixelStore } from '../../../utils';
import { IChat } from '../messanger.type';

export class ChatListController {
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

  selectChat = (chatId: number) => {
    if (!PixelStore.store.selectedChat || PixelStore.store.selectedChat.id !== chatId) {
      PixelStore.dispatch(
        'selectedChat',
        PixelStore.store.chats.find((chat: IChat) => chat.id === chatId)
      );
    }
  };
}
