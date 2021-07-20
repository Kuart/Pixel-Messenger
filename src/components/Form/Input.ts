import { IComponentModel } from '../../utils';
import './Input.css';

export function Input(): IComponentModel {
  return {
    template: /* html */ `
    <div class="input">
      <label p:class="input__label {{loginClass}}" p:for="id">{{props.label}}</label>
      <div class="input__control-wrapper">
        <input 
          class="input__control" 
          p:name="name" 
          p:type="type" 
          p:placeholder="placeholder" 
          p:id="id" 
          p:value="value"
          e:input="props.inputHandler" />
        <span class="input__underline"></span>
      </div>
      <div class="input__error">{{props.error}}</div>
    </div>`,
  };
}
