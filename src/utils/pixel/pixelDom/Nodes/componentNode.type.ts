import { IComponent } from './nodes.type';

type EventHadnlerConfig = { event: string; name: string; target?: HTMLElement; handler?: Function };
type Listaner = { target: HTMLElement; type: string; listener: Function };

type Methods = Record<string, Function>;
type Props = Record<string, any>;
type State = Record<string, any>;

interface IComponentModel extends IComponent {
  components?: Record<string, Function>;
  usedProps?: string[];
}
interface IInitiatedComponent extends IComponent {
  components?: Record<string, Function>;
  usedProps?: string[];
  name: string;
}

export { Methods, Props, State, IComponentModel, Listaner, EventHadnlerConfig, IInitiatedComponent };
