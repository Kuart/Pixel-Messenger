import { IMessage, IUser } from '../../interfaces';

export interface IChat {
  id: number;
  title: string;
  avatar: null;
  created_by: number;
  unread_count: number;
  last_message: null;
  messages: IMessage[];
  index: number;
  users: IUser[];
}
