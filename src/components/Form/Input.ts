import { IComponentModel } from '../../utils';
import './Input.css';

export function Input(): IComponentModel {
  return {
    template: /* html */ `
    <div class="input">
      <label p:class="input__label {{props.loginClass || ''}}" p:for="id">{{props.label}}</label>
      <div class="input__control-wrapper">
        <input 
          class="input__control" 
          p:name="name" 
          p:type="type" 
          p:placeholder="{{props.placeholder || ''}}" 
          p:id="id" 
          p:value="value"
          e:input="props.onChange"
        />
        <span class="input__underline"></span>
      </div>
      <div class="input__error">{{props.error}}</div>
    </div>`,
  };
}
