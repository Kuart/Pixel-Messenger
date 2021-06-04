import { generateUniqId } from '../../utils/helpers';
import './Input.css';

export function Input(props) {
  const context = { type: 'text', inputType: 'input', icon: '', eventTarget: '', name: '', error: '', ...props };
  const id = generateUniqId();

  const template = `
  <div class="input">
    <label class="input__label" for="Input{{id}}${id}">{{label}}</label>
    <div class="input__control-wrapper">

      <{{inputType}} 
        class="input__control {{eventTarget}}" 
        name="{{name}}" 
        type="{{type}}" 
        placeholder="{{placeholder}}"
        id="Input{{id}}${id}"
      ></{{inputType}}>
      
      <span class="input__underline"></span>
    </div>
    <div class="input__error">{{error}}</div>
  </div>`;

  return { template, context, name: 'Input' };
}
