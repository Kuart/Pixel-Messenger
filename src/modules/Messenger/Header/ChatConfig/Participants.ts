import { IComponentModel } from '../../../../utils';
import { UserBadge } from './UserBadge';

export function Participants(): IComponentModel {
  return {
    components: {
      UserBadge,
    },
    template: /* html */ `
      <div class="chat-config__participants">
        <UserBadge map:array="props.chatUsers" b:onClick="props.removeUser" />
      </div>
    `,
  };
}
