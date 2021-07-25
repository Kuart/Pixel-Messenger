import { IComponentModel } from '../../../utils';
import { ListItem } from './ListItem';

export function List(): IComponentModel {
  return {
    components: {
      ListItem,
    },
    template: /* html */ ` 
    <div>
    
      <ul class="chat-list__list" if:truthy="props.filteredChats">
        
      </ul>
      
      <p class="chat-list__list_blank" if:falsy="props.filteredChats">
        <i>Нет активных чатов</i>
      </p>
      
    </div>
    `,
  };
}

/* <ListItem loop:filteredChats /> */
