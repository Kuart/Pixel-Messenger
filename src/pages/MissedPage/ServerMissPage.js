import './MissedPage';

export function ServerMissPage(props) {
  const context = { ...props };

  const template = `
    <section class="error-page_500 error-page">
      <div class="error-page__content error-page__content_500">
        <h1 class="error-page__title">500</h1>
        <p class="error-page__message">Страница временно не доступна</p>
        <a class="error-page__link" href="/" >PIXEL CHAT</a>
      </div>
    </section>
    `;
  return {
    context,
    template,
    name: 'ServerMissPage'
  };
}