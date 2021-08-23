import {
  IEventsCallbacks,
  IMessage,
  IMessageEvent,
  IPayload,
  MessageEventCallback,
  CloseEventCallback,
} from '../interfaces';
import { IChat } from '../modules/Messenger/messenger.type';

export class ChatWebSocket {
  static TYPES = {
    MESSAGE: 'message',
    MESSAGES_HISTORY: 'get old',
  };

  socket: WebSocket;

  chat: IChat;

  constructor(userId: number, chat: IChat, token: string, callbacks?: IEventsCallbacks) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${token}`);

    this.socket.addEventListener('open', this.openHandler.bind(this, callbacks?.openCB));

    this.socket.addEventListener('close', this.closeHandler.bind(this, callbacks?.closeCB));

    this.socket.addEventListener('message', this.messageHandler.bind(this, callbacks?.messageCB));

    this.socket.addEventListener('error', this.errorHandler.bind(this, callbacks?.errorCB));

    this.chat = { ...chat, messages: [] };
  }

  openHandler = () => {
    this.sendMessage('0', ChatWebSocket.TYPES.MESSAGES_HISTORY);
  };

  messageHandler = (callback: MessageEventCallback, event: IMessageEvent) => {
    const data: Record<string, string> | IMessage[] | IMessage = event.data ? JSON.parse(event.data) : '';
    if ((data && Array.isArray(data)) || data.type !== 'pong') {
      callback(this.chat.id, data);
    }
  };

  errorHandler = (event: any) => {};

  closeHandler = (callback: CloseEventCallback, event: any) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
  };

  sendMessage(content: string, type: string = ChatWebSocket.TYPES.MESSAGE) {
    const payload: IPayload = { type };

    if (content) {
      payload.content = content;
    }

    this.socket.send(JSON.stringify(payload));
  }
}
