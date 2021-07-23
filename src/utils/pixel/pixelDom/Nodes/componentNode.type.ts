import { IComponent } from './nodes.type';

type EventHadnlerConfig = { event: string; name: string; target?: HTMLElement; handler?: Function };
type Listaner = { target: HTMLElement; type: string; listener: Function };

type Methods = Record<string, Function>;
type Props = Record<string, any>;
type State = Record<string, any>;
type EventHandler = Map<string, Function>;

interface IComponentModel extends Omit<IComponent, 'componentProps' | 'methods' | 'state' | 'pixelStore'> {
  components?: Record<string, Function>;
  template: string;
  methods?: Methods;
  state?: State;
  pixelStore?: string[];
}
interface IInitiatedComponent extends IComponent {
  components?: Record<string, Function>;
  name: string;
  methods?: Methods;
  template: string;
}

export { Methods, Props, State, IComponentModel, Listaner, EventHadnlerConfig, IInitiatedComponent, EventHandler };
