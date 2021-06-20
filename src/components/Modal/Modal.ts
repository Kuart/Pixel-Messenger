import { IComponentModel } from '../../utils';
import './Modal.css';

export default function Modal(): IComponentModel {
  return {
    usedProps: ['children', 'headerText'],
    template: /* html */ `
    <section class="modal">
      <header class="modal__header">
        <h2>{{headerText}}</h2>
      </header>
      <div class="modal__body">{{children}}</div>              
    </section>
    `,
  };
}
