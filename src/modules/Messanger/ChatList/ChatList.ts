import { IComponentModel } from '../../../utils';
import { Input } from '../../../components';
import './ChatList.css';

export function ChatList(): IComponentModel {
  return {
    components: {
      Input,
    },
    template: /* html */ ` 
    <aside class="messanger__chat-list">
      <form class="search-form">
        <Input type="search" name="search" class="search-form__contol" />
      </form>
      <ul class="chat-list__list ">
      </ul>
    </aside>
    `,
  };
}
