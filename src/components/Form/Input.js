import { generateUniqId } from '../../utils/helpers';
import './Input.css';

export function Input(props) {
  const context = { type: 'text', eventTarget: '', name: '', error: '', generateId: generateUniqId, ...props };

  const template = `
  <div class="input">
    <label class="input__label" for="Input{{generateId}}">{{label}}</label>
    <div class="input__control-wrapper">
      <input class="input__control {{eventTarget}}" name="{{name}}" type={{type}} id="Input{{generateId}}" />
      <span class="input__underline"></span>
    </div>
    <div class="input__error">{{error}}</div>
  </div>`;

  return { template, context };
}
