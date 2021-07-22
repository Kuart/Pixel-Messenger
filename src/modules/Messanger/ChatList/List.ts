import { IComponentModel } from '../../../utils';
import { ListItem } from './ListItem';

export function List(): IComponentModel {
  return {
    components: {
      ListItem,
    },
    template: /* html */ ` 
      <ul class="chat-list__list" if:filteredChats.length>
        <ListItem loop:filteredChats />
      </ul>
      
      <p class="chat-list__list_blank" if:!filteredChats.length>
        <i>Нет активных чатов</i>
      </p>
    `,
  };
}
