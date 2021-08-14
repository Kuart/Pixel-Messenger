export interface IPayload {
  content?: string;
  type: string;
}
export interface IMessage {
  user_id: number;
  time: string;
}

export type OpenEventCallback = () => void;
export type CloseEventCallback = () => void;
export type MessageEventCallback = (chatIndex: number, messages: IMessage[]) => void;

export interface IEventsCallbacks {
  openCB?: OpenEventCallback;
  closeCB?: MessageEventCallback;
  messageCB?: () => void;
  errorCB?: () => void;
}

export interface IMessageEvent {
  data: string;
  type: string;
}
