export class WebSocketAPI {
  socket: WebSocket;

  init(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', this.openHandler);

    this.socket.addEventListener('close', this.closeHandler);

    this.socket.addEventListener('message', this.messageHandler);

    this.socket.addEventListener('error', this.errorHandler);
  }

  openHandler = (event: any) => {
    console.log('Соединение установлено');
  };

  messageHandler = (event: any) => {
    console.log('Получены данные', event.data);
  };

  errorHandler = (event: any) => {};

  closeHandler = (event: any) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  };

  sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }
}
