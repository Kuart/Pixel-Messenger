import './Modal.css';

export const defaultModalContext = () => {
  return {
    classes: {
      modal: 'modal',
      header: 'modal__header',
      body: 'modal__body'
    },
    slots: {},
    headerText: ''
  };
};

export function Modal(props) {
  const context = {
    ...defaultModalContext(),
    ...props
  };

  const template = `
    <section class="{{classes.modal}}">
      <header class="{{classes.header}}">
        <h2>{{headerText}}</h2>
      </header>
      <div class="{{classes.body}}">{{slots.body}}</div>              
    </section>`;

  return {
    template,
    context,
    name: 'Modal'
  };
}
