import user1 from '../../../../static/assets/images/Icon/_emj12.png';
import user2 from '../../../../static/assets/images/Icon/_emj14.png';
import user3 from '../../../../static/assets/images/Icon/shock.png';
import user6 from '../../../../static/assets/images/Icon/alien.png';
import user4 from '../../../../static/assets/images/Icon/U.png';
import user7 from '../../../../static/assets/images/Icon/alianGtransp.png';
import user8 from '../../../../static/assets/images/Icon/astro.png';
import user9 from '../../../../static/assets/images/Icon/15.png';

export const chats = [
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
    isActive: true,
  },
  {
    userPhotoUrl: user2,
    userName: 'Дмитрий',
    message: 'важная информация',
    time: '09:11',
    messageCount: 0,
    isAuther: true,
  },
  {
    userPhotoUrl: user8,
    userName: 'Команда',
    message: 'окей, тогда в вск',
    time: 'Вчера',
    messageCount: 0,
    isAuther: true,
  },
  { userPhotoUrl: user6, userName: 'Билеты', message: '1967348', time: 'ПТ', messageCount: 0 },
  { userPhotoUrl: user4, userName: 'Ульяна', message: 'а модули ?', time: 'ЧТ', messageCount: 0 },
  { userPhotoUrl: user1, userName: 'Успехмен', message: 'Успехов!', time: '11.05', messageCount: 0, isAuther: true },
];
