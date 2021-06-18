import { IComponentModel } from '../../utils';
import { Input, Modal, Button } from '../../components';
import './Auth.css';

function Registration(): IComponentModel {
  return {
    state: {
      formFields: {
        login: '',
        password: '',
      },
    },
    methods: {
      submitForm: (event: Event) => {
        event.preventDefault();
        console.log(event);
      },
      register: (event: Event) => {
        console.log(event);
      },
      inputHandler: (event: Event) => {
        console.log(event.target.name);
      },
    },
    components: {
      Modal,
      Input,
      Button,
    },
    template: /* html */ `
    <section class="modal">
      <header class="modal__header">
        <h2>Вход</h2>
      </header>
      <div class="modal__body">
  
      </div>              
    </section>`,
  };
}

export default Registration;
