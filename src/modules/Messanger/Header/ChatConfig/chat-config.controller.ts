import { chatAPI } from '../../../../api';
import { ChatController } from '../../../../controllers';
import { IUser } from '../../../../interfaces';
import { PixelStore } from '../../../../utils';
import { VComponentNode } from '../../../../utils/pixel/pixelDom';

const chatController = new ChatController();
class ChatConfigController {
  removeChat = async (component: VComponentNode) => {
    const { id } = component.componentProps.chat;
    await chatAPI.delete({ chatId: id });

    await chatController.getChats();

    component.componentProps.modalClose();

    PixelStore.dispatch('selectedChat', {});
  };

  removeUser = (userId: number, component: VComponentNode) => {
    const { id } = component.componentProps.chat;
    const { chatUsers } = component.state;
    chatAPI.deleteUser({ users: [userId], chatId: id });
    component.state.chatUsers = chatUsers.filter((user: IUser) => user.id !== userId);
  };

  addUser = async (title: string, component: VComponentNode) => {
    const { id } = component.componentProps.chat;
    await chatAPI.addUser({ users: [Number(title)], chatId: id });
    const users = await chatAPI.getUsers(id);
    component.state.chatUsers = users;
    component.state.title = '';
  };

  updateAvatar = async (event: any, chatId: string) => {
    const newForm = new FormData();
    newForm.append('avatar', event.target.files[0]);
    newForm.append('chatId', chatId);
    const chat = await chatAPI.uploadAvatar(newForm);
    PixelStore.dispatch('selectedChat', chat);
  };
}

export const chatConfigController = new ChatConfigController();
