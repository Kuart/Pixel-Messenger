import { IComponentModel } from '@/utils';
import { Header, ChatList, Chat } from '@/modules';
import './Messenger.css';

function Messenger(): IComponentModel {
  return {
    components: { Header, ChatList, Chat },
    template: /* html */ `
    <div class="container">
      <div class="messenger">
        <Header />
        <ChatList />
        <Chat />
      </div>
    </div>
    `,
  };
}

export default Messenger;
