import { IMessage, IUser } from '../../interfaces';

/* eslint camelcase: "off" */
export interface IChat {
  id: number;
  title: string;
  avatar: null;
  created_by: number;
  unread_count: number;
  last_message: null;
  lastMessage: null | IMessage;
  messages: IMessage[];
  index: number;
  users: IUser[];
}
