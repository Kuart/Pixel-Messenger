import { Attributes, Parser } from '../parser';

type EventHadnlerConfig = { event: string; name: string; target?: HTMLElement; handler?: Function };
type Methods = Record<string, Function>;
type Listaner = { target: HTMLElement; type: string; listener: Function };
type Props = Record<string, string | number | boolean | [] | { [key: string]: unknown } | null | undefined | object>;
type State = Record<string, any>;

interface IComponent {
  template: string;

  usedProps?: string[];
  state?: State;
  methods?: Record<string, Function>;
  componentDidMount?: Function;
  pixelStore?: Record<string, any>;
}
interface IComponentOptions extends Omit<IComponent, 'methods'> {
  tagName: string;
  componentName: string;
  parserInstant: Parser;
  props?: Props;
  attrs?: Attributes;
  propHandlers?: Methods;
  methods?: Methods;
}

interface IComponentModel extends IComponent {
  components?: Record<string, Function>;
}

export { IComponentOptions, Methods, Props, State, IComponentModel, Listaner, EventHadnlerConfig };
