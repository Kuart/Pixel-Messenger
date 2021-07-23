import { IComponentModel } from '../../utils';
import './Modal.css';

export default function Modal(children: string): IComponentModel {
  return {
    template: /* html */ `
    <div class="modal-window__container">
      <section class="modal">
        <header class="modal__header">
          <h2>{{props.headerText}}</h2>
        </header>
        <div class="modal__body">${children}</div>              
      </section>
    </div>
    `,
  };
}
