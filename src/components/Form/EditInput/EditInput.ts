import { IComponentModel } from '../../../utils';
import { Input } from '../Input';
import { Button } from '../../Button';
import './EditInput.css';

export function EditInput(): IComponentModel {
  return {
    components: {
      Input,
      Button,
    },
    template: /* html */ `
    <div class="edit-input__container">
      <Input 
        b:label="props.label" 
        b:name="props.name" 
        type="text" 
        b:id="props.id" 
        b:value="props.value"
        b:loginClass="props.loginClass"
        b:error="props.error"
        b:onChange="props.onChange"
      />

      <Button 
        b:disabled="props.isDisabled"
        b:text="props.buttonText" 
        class="button_transparent button_transparent_send" 
        b:onClick="props.onClick" />
    </div>`,
  };
}
