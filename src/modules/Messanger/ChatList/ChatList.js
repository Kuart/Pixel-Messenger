import { Pixel } from '../../..';
import './ChatList.css';
import { ListItem } from './ListItem';
import { UserPhoto } from '../../../components/UserPhoto/UserPhoto';

import user1 from 'url:../../../../static/assets/images/Icon/_emj12.png';
import user2 from 'url:../../../../static/assets/images/Icon/_emj14.png';
import user3 from 'url:../../../../static/assets/images/Icon/shock.png';
import user6 from 'url:../../../../static/assets/images/Icon/alien.png';
import user4 from 'url:../../../../static/assets/images/Icon/U.png';
import user7 from 'url:../../../../static/assets/images/Icon/alianGtransp.png';
import user8 from 'url:../../../../static/assets/images/Icon/astro.png';
import user9 from 'url:../../../../static/assets/images/Icon/15.png';

export function ChatList() {
  Pixel.registerComponent(ListItem);
  Pixel.registerComponent(UserPhoto);

  const context = {
    chatList: [
      { userPhotoUrl: user1, userName: 'Иван', message: 'Хватит меня игнорить!!!', time: '19:23', messageCount: 4 },
      { userPhotoUrl: user9, userName: 'Винц', message: 'ты все еще его игноришь?))', time: '19:20', messageCount: 1 },
      { userPhotoUrl: user7, userName: 'Каленск', message: 'чет даже не знаю', time: '18:44', messageCount: 1 },
      {
        userPhotoUrl: user1,
        userName: 'Даник',
        message: `<img src="${user3}" width="30" height="30"/>`,
        time: '14:25',
        messageCount: 0,
        isAuther: true,
        isActive: true
      },
      {
        userPhotoUrl: user2,
        userName: 'Дмитрий',
        message: 'важная информация',
        time: '09:11',
        messageCount: 0,
        isAuther: true
      },
      {
        userPhotoUrl: user8,
        userName: 'Команда',
        message: 'окей, тогда в вск',
        time: 'Вчера',
        messageCount: 0,
        isAuther: true
      },
      { userPhotoUrl: user6, userName: 'Билеты', message: '1967348', time: 'ПТ', messageCount: 0 },
      { userPhotoUrl: user4, userName: 'Ульяна', message: 'а модули ?', time: 'ЧТ', messageCount: 0 },
      { userPhotoUrl: user1, userName: 'Успехмен', message: 'Успехов!', time: '11.05', messageCount: 0, isAuther: true }
    ],
    searchHandler
  };
  const template = `
  <aside class="messanger__chat-list">
      <form class="search-form">
        <input type="search" name="search" class="search-form__contol" {{_eventInput=searchHandler=search-form__contol}}/>
      </form>
      <ul class="chat-list__list ">
        {{# @chatList @ListItem #}}
      </ul>
  </aside>`;
  return {
    template,
    context,
    name: 'ChatList'
  };
}

function searchHandler(e) {
  const { name, value } = e.target;
  console.log(name, value);
}
