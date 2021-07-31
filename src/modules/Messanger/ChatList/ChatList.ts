import { IComponentModel } from '../../../utils';
import { SearchInput } from '../../../components';
import { CustomEventTarget } from '../../../interfaces';
import { List } from './List';
import { ChatListController } from './chat-list.controller';
import './ChatList.css';
import { ChatController } from '../../../controllers';

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
      filteredChats: [],
    },
    componentDidMount() {
      chatController.getChats();
    },
    methods: {
      filterChatList(event: CustomEventTarget<HTMLInputElement>) {
        const { value } = event.target;
        this.state.searchValue = value;
        chatListController.filterChats(value);
      },
      setActiveChat(chatId: number) {
        chatListController.selectChat(chatId);
      },
    },
    pixelStore: ['filteredChats'],
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
