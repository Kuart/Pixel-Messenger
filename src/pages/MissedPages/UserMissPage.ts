import { IComponentModel } from '../../utils';
import './MissedPages.css';

export function UserMissPage(): IComponentModel {
  return {
    template: /* html */ `
    <div class="container container_user-miss">
      <section class="error-page_404 error-page">
        <div class="error-page__content">
          <h1 class="error-page__title">404</h1>
          <p class="error-page__message">Страница, которую вы запрашиваете, не найдена</p>
        </div>
        <a class="error-page__link" href="/" >PIXEL CHAT</a>
      </section>
    </div>
    `,
  };
}
