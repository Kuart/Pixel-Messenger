import { IComponentModel } from '../../utils';
import './Input.css';

export function SearchInput(): IComponentModel {
  return {
    template: /* html */ `
    <div class="input">
      <input 
        type="search" 
        p:class="class" 
        p:name="name" 
        p:placeholder="placeholder" 
        p:value="value"
        e:input="props.onChange"
        />
    </div>`,
  };
}
