import { IComponentModel } from '../../utils';
import './Input.css';

export function Input(): IComponentModel {
  return {
    state: {
      error: '',
    },
    usedProps: ['name', 'type', 'id', 'placeholder', 'label', 'errors', 'loginClass', 'value'],
    template: /* html */ `
    <div class="input">
      <label p:class="input__label {{loginClass}}" p:for="id">{{label}}</label>
      <div class="input__control-wrapper">
        <input 
          class="input__control" 
          p:name="name" 
          p:type="type" 
          p:placeholder="placeholder" 
          p:id="id" 
          p:value="value"
          e:input="inputHandler" />
        <span class="input__underline"></span>
      </div>
      <div class="input__error">{{errors}}</div>
    </div>`,
  };
}
