function Modal() {
  return {
    props: ['classes', 'child'],
    template: /* html */ `
    <section p-class="classes.modal">
      <header p-class="classes.header">
        <h2>{{headerText}}</h2>
      </header>
      <div p-class="classes.body">{{child}}</div>              
    </section>
    `,
  };
}

export { Modal };
