import './Button.css';

export function Button(props) {
  const context = {
    text: '',
    class: '',
    ...props
  };

  const template = `
    <button class="button {{class}}">{{text}}</button>
  `;

  return {
    template,
    context
  };
}
