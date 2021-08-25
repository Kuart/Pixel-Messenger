import { IComponentModel } from '@/utils';
import { Header, ChatList, Chat } from '@/modules';
import './Messanger.css';

function Messanger(): IComponentModel {
  return {
    components: { Header, ChatList, Chat },
    template: /* html */ `
    <div class="container">
      <div class="messanger">
        <Header />
        <ChatList />
        <Chat />
      </div>
    </div>
    `,
  };
}

export default Messanger;
