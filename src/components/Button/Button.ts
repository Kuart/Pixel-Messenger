import { IComponentModel } from '../../utils';
import './Button.css';

export default function Button(): IComponentModel {
  return {
    usedProps: ['width', 'text'],
    template: /* html */ `
      <button p:width="width">{{text}}</button>
    `,
  };
}
