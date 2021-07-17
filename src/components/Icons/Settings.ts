import { IComponentModel } from '../../utils';
import setting from '../../../static/assets/images/Icon/settings.png';

export function Settings(): IComponentModel {
  return {
    template: /* html */ `,
    <img src="${setting}"/>
    `,
  };
}
