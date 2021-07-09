import { IComponentModel } from '../../../utils';
import { SearchInput } from '../../../components';
import { CustomEventTarget } from '../../../types';
import { ListItem } from './ListItem';
import { ChatListController } from './chat-list.controller';
import './ChatList.css';

const chatListController = new ChatListController();

/* eslint no-console: "off" */
export function ChatList(): IComponentModel {
  return {
    components: {
      SearchInput,
      ListItem,
    },
    state: {},
    pixelStore: ['chats', 'filteredChats'],
    componentDidMount() {
      chatListController.getChats();
    },
    methods: {
      filterChatList(event: CustomEventTarget<HTMLInputElement>) {
        const { value } = event.target;
        chatListController.filterChats(value);
      },
    },
    template: /* html */ ` 
    <aside class="messanger__chat-list" >
      <form class="search-form">
        <SearchInput 
          s:name="search" 
          s:class="search-form__contol" 
          e:input="filterChatList" 
          s:placeholder="Поиск" 
          d:value="searchValue" />
      </form>
      <ul class="chat-list__list">
        <ListItem loop:filteredChats />
      </ul>
    </aside>
    `,
  };
}
