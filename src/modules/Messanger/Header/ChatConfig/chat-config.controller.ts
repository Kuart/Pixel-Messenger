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

  getUsers = async (component: VComponentNode) => {
    const { id } = component.componentProps.chat;
    const users = await chatAPI.getUsers(id);
    component.state.chatUsers = users;
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
    component.state.title = '';
    this.getUsers(component);
  };
}

export const chatConfigController = new ChatConfigController();