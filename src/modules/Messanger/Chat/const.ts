import alien from '../../../../static/assets/images/Icon/alien.png';
import shock from '../../../../static/assets/images/Icon/shock.png';
import user9 from '../../../../static/assets/images/Icon/_emj12.png';
import sticker from '../../../../static/assets/images/Icon/emoji3.png';
import avatar from '../../../../static/assets/images/Icon/ava.png';

export const messages = [
  {
    author: 'Денис',
    message: `<img src="${shock}" class="emoji" />`,
    time: '14:25',
    photo: avatar,
    isAuthor: true,
  },
  {
    author: 'Даник',
    message: `а я успеваю! <img src="${alien}" class="emoji"/>`,
    time: '14:24',
    photo: user9,
  },
  {
    author: 'Денис',
    message: `<img src="${sticker}" class="sticker"/>`,
    time: '13:44',
    photo: avatar,
    isAuthor: true,
  },
  {
    author: 'Даник',
    message: `Успеваешь к дедлайну?`,
    time: '12:20',
    photo: user9,
  },
];
