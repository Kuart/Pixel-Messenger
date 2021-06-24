import { IComponentModel } from '../../utils';

export function PagesContainer(): IComponentModel {
  return {
    template: /* html */ `
    <div>
      {{children}}
    </div>
    `,
  };
}
