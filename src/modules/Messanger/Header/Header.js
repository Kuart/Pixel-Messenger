import './Header.css';
import setting from 'url:../../../../static/assets/images/Icon/settings.png';

export function Header() {
  const context = {};
  const template = `
  <header class="messanger__header">
    <section class="messanger__header-title">
      <h1 class="header-title__logo">Pixel Chat</h1>
      <img class="header-title__settings" src="${setting}"/>
    </section>
    <div class="messanger__chat-info">
      <div class="chat-info__container">
          <h2 class="chat-info__title">ДАНИК</h2>

          <svg width="5" height="19" viewBox="0 0 5 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="5" height="5" fill="#985CAF"/>
            <rect y="7" width="5" height="5" fill="#985CAF"/>
            <rect y="14" width="5" height="5" fill="#985CAF"/>
          </svg>
      </div>
    </div>
  </header>`;
  return {
    template,
    context,
    name: 'Header'
  };
}
