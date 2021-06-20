import { IComponentModel } from '../../../utils';
import { SearchInput } from '../../../components';
import { CustomEventTarget } from '../../../types';
import { ListItem } from './ListItem';
import { chats } from './const';
import './ChatList.css';

export function ChatList(): IComponentModel {
  return {
    components: {
      SearchInput,
      ListItem,
    },
    state: {
      chats,
    },
    /* eslint-disable */
    methods: {
      formFocusHandler: function (event: Event) {
        console.log(event.target);
      },
      formBlurHandler: function (event: Event) {
        console.log(event.target);
      },
      filterChartList: function (event: CustomEventTarget<HTMLInputElement>) {
        const { name, value } = event.target;
        console.log(`${name} ${value}`);
      },
    },
    /* eslint-enable */
    template: /* html */ ` 
    <aside class="messanger__chat-list" >
      <form class="search-form" e:blur="formFocusHandler" e:blur="formBlurHandler">
        <SearchInput s:name="search" s:class="search-form__contol" e:input="filterChartList" s:placeholder="Поиск"/>
      </form>
      <ul class="chat-list__list">
        <ListItem loop:chats />
      </ul>
    </aside>
    `,
  };
}
