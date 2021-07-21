import { IComponentModel } from '../../utils';
import './Button.css';

export default function Button(): IComponentModel {
  return {
    template: /* html */ `
      <button p:class="button {{props.class}}" e:click="props.onClick">{{props.text}}</button>
    `,
  };
}
