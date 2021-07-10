import { IComponent } from './nodes.type';

type EventHadnlerConfig = { event: string; name: string; target?: HTMLElement; handler?: Function };
type Methods = Record<string, Function>;
type Listaner = { target: HTMLElement; type: string; listener: Function };
type Props = Record<string, string | number | boolean | [] | { [key: string]: unknown } | null | undefined | object>;
type State = Record<string, any>;

interface IComponentModel extends IComponent {
  components?: Record<string, Function>;
  usedProps?: string[];
}

export { Methods, Props, State, IComponentModel, Listaner, EventHadnlerConfig };
