import { IComponentModel } from '../../../utils';
import { SearchInput } from '../../../components';
import { CustomEventTarget } from '../../../interfaces';
import { List } from './List';
import { ChatListController } from './chat-list.controller';
import './ChatList.css';
import { ChatController } from '../../../controllers';
import { IChat } from '../messanger.type';

const chatController = new ChatController();
const chatListController = new ChatListController();

/* eslint no-console: "off" */
export function ChatList(): IComponentModel {
  return {
    components: {
      SearchInput,
      List,
    },
    state: {
      searchValue: '',
      chats: [],
      filteredChats: [],
    },
    componentDidMount() {
      chatController.getChats();
    },
    methods: {
      filterChatList(event: CustomEventTarget<HTMLInputElement>) {
        const { value } = event.target;
        this.state.searchValue = value;
      },
      setActiveChat(chatId: number) {
        chatListController.selectChat(chatId);
      },
    },
    componentDidUpdate(_, props: Record<string, any>) {
      if ('searchValue' in props) {
        const { chats } = this.state;
        this.state.filteredChats = chats.filter((chat: IChat) => chat.title.indexOf(props.searchValue) !== -1);
      } else if (props.chats) {
        if (this.state.searchValue) {
          this.state.filteredChats = props.chats.filter((chat: IChat) => chat.title.indexOf(props.searchValue) !== -1);
        } else {
          this.state.filteredChats = props.chats;
        }
      }
    },
    pixelStore: ['chats'],
    template: /* html */ ` 
    <aside class="messanger__chat-list" >
      <form class="search-form">
        <SearchInput 
          name="search" 
          class="search-form__contol" 
          placeholder="Поиск" 
          b:onChange="methods.filterChatList" 
          b:value="state.searchValue" />
      </form>
      <List b:filteredChats="state.filteredChats" b:setActiveChat="methods.setActiveChat"/>
    </aside>
    `,
  };
}
