import { IComponentModel } from '../../utils';
import './Button.css';

export function Button(): IComponentModel {
  return {
    template: /* html */ `
      <button 
        p:class="button {{props.class}}" 
        e:click="props.onClick" 
        p:disabled="{{props.isDisabled}}">{{props.text}}</button>
    `,
  };
}
