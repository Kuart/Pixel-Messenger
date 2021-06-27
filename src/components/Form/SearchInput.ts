import { IComponentModel } from '../../utils';
import './Input.css';

export function SearchInput(): IComponentModel {
  return {
    usedProps: ['name', 'placeholder', 'class'],
    template: /* html */ `
    <div class="input">
      <input 
        p:class="class" 
        p:name="name" 
        type="search" 
        p:placeholder="placeholder" 
        e:input="inputHandler"/>
    </div>`,
  };
}