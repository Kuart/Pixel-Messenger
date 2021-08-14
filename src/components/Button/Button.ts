import { IComponentModel } from '../../utils';
import './Button.css';

export function Button(): IComponentModel {
  return {
    template: /* html */ `
      <button
        p:type="type"
        p:class="button {{props.class}}"
        e:submit="props.onClick"
        e:click="props.onClick">{{props.text}}</button>
    `,
  };
}
