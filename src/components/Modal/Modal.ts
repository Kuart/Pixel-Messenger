import { IComponentModel } from '../../utils';
import close from '../../../static/assets/images/Icon/close.svg';
import './Modal.css';

export default function Modal(
  children: string,
  icons: string = '',
  headerData: string = '',
  buttons: string = ''
): IComponentModel {
  return {
    template: /* html */ `
    <div class="modal-window__container">
      <section class="modal-window__main">
        <header class="modal-window__header">
          <div class="modal-window__title">
            ${icons}
            <h3>{{props.headerText}}</h3>
            ${headerData}
          </div>

          <div class="modal-window__actions">
            ${buttons}
            <img class="modal-window__close" src="${close}" e:click="props.modalClose"/>
          </div>
        </header>
        <div class="modal-window__body">${children}</div>              
      </section>
    </div>
    `,
  };
}
