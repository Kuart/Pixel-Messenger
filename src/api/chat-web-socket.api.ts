import { IEventsCallbacks, IMessageEvent, IPayload, MessageEventCallback } from '../interfaces';
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

    this.socket.addEventListener('message', this.messageHandler.bind(this, callbacks?.messageCB));

    this.chat = { ...chat, messages: [] };
  }

  openHandler = () => {
    this.sendMessage('0', ChatWebSocket.TYPES.MESSAGES_HISTORY);
  };

  messageHandler = (callback: MessageEventCallback, event: IMessageEvent) => {
    const data: any = event.data ? JSON.parse(event.data) : '';
    if ((data && Array.isArray(data)) || data.type !== 'pong') {
      callback(this.chat.id, data);
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
