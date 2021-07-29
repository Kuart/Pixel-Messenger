import { IComponentModel } from '../../utils';
import './ShortModal.css';

export function ShortModal(children: string): IComponentModel {
  return {
    template: /* html */ `
    <div class="short-modal__container">
      ${children}
    </div>
    `,
  };
}
