import { chatAPI, ChatWebSocket } from '../api';
import { IMessage, IUser } from '../interfaces';
import { IChat } from '../modules/Messenger/messenger.type';
import { dateHandler, PixelStore } from '../utils';

class MessagesController {
  static TYPES = {
    PING: 'ping',
  };

  sockets: Map<number, ChatWebSocket> = new Map();

  chatInArray: Map<number, number> = new Map();

  chats: IChat[];

  users: Map<number, IUser> = new Map();

  timer: unknown;

  constructor() {
    this.timer = setInterval(() => {
      this.pingPong();
    }, 25000);
  }

  initSocket(userId: number, chat: IChat, token: string) {
    const socket = new ChatWebSocket(userId, chat, token, { messageCB: this.onMessage.bind(this) });
    this.sockets.set(chat.id, socket);
  }

  onMessage(chatId: number, wsMessage: IMessage[] | IMessage) {
    const { messages, lastMessage } = this.convertMessages(wsMessage);
    this.chats[this.chatInArray.get(chatId)!].messages.push(...messages);
    this.chats[this.chatInArray.get(chatId)!].lastMessage = lastMessage;

    PixelStore.dispatch('chats', this.chats);
    if (PixelStore.store.selectedChat && PixelStore.store.selectedChat.id === chatId) {
      PixelStore.dispatch('selectedChat', this.chats[this.chatInArray.get(chatId)!]);
    }
  }

  pingPong() {
    this.sockets.forEach((socket) => {
      socket.sendMessage('', MessagesController.TYPES.PING);
    });
  }

  send(chatId: number, message: string) {
    this.sockets.get(chatId)?.sendMessage(message);
  }

  init = async (chats: IChat[]) => {
    const { id } = PixelStore.currentUser;
    const chatsToInit: { chatId: number; tokenReq: Promise<any> }[] = [];
    const chatUsers: { chatId: number; userReq: Promise<any> }[] = [];
    const usedChats = new Map();

    chats.forEach((chat) => {
      if (!this.sockets.has(chat.id)) {
        chatsToInit.push({ chatId: chat.id, tokenReq: chatAPI.getSingle(chat.id) });
        chatUsers.push({ chatId: chat.id, userReq: chatAPI.getUsers(chat.id) });
      }

      usedChats.set(chat.id, chat);
    });

    const tokens: { token: string }[] = await Promise.all(chatsToInit.map((chatConf) => chatConf.tokenReq));
    const users: IUser[][] = await Promise.all(chatUsers.map((chatConf) => chatConf.userReq));

    chatsToInit.forEach((chat, index) => {
      this.initSocket(id, usedChats.get(chat.chatId), tokens[index].token);
    });

    this.chatInArray.clear();
    this.clearSockets(usedChats);
    this.chats = [];

    let i = 0;
    for (const item of this.sockets) {
      this.chatInArray.set(item[1].chat.id, i);
      item[1].chat.users = this.convertUsers(users[i]);
      item[1].chat.index = i;
      this.chats.push(item[1].chat);
      i += 1;
    }
  };

  clearSockets(usedChats: Map<number, IChat>) {
    this.sockets.forEach((socket, key: number) => {
      if (!usedChats.has(key)) {
        socket.socket.close();
        this.sockets.delete(key);
      }
    });
  }

  convertUsers(users: IUser[]) {
    if (users) {
      return users.map((user) => {
        this.users.set(user.id, user);
        return user;
      });
    }

    return [];
  }

  convertMessages = (messages: IMessage | IMessage[]) => {
    const { id } = PixelStore.currentUser;
    const toConvert = Array.isArray(messages) ? messages.reverse() : [messages];

    const converted = toConvert.map((message) => {
      const time = dateHandler.parseToChatFormat(message.time);
      const user = this.users.get(message.user_id);
      const isAuthor = user?.id === id;

      return {
        ...message,
        isAuthor,
        time,
        avatar: user?.avatar,
        name: user?.display_name ? user.display_name : user?.login,
      };
    });
    let lastMessage = null;

    if (converted.length && converted.length > 1) {
      lastMessage = converted[converted.length - 1];
    } else if (converted.length) {
      lastMessage = converted[0];
    }

    return {
      messages: converted,
      lastMessage,
    };
  };
}

export const messagesController = new MessagesController();
