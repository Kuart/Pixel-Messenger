import { IComponentModel } from '../../utils';
import './PagesContainer.css';

export function PagesContainer(): IComponentModel {
  return {
    template: /* html */ `
    <div>
      {{children}}
    </div>
    `,
  };
}
