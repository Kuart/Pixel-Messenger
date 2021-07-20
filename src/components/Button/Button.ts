import { IComponentModel } from '../../utils';
import './Button.css';

export default function Button(): IComponentModel {
  return {
    componentDidMount() {
      console.log(this);
    },
    template: /* html */ `
      <button p:width="width">{{props.text}}</button>
    `,
  };
}
