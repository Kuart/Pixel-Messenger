import { Attributes } from '../../parser';

type Methods = Record<string, { event: string; handler?: Function }>;
type Props = Record<string, string | number | boolean | [] | { [key: string]: unknown }>;
type State = Record<string, string | number | boolean | [] | { [key: string]: unknown }>;

interface IComponentOptions {
  tagName: string;
  props?: Props;
  state?: State;
  attrs?: Attributes;
  componentMethods?: Methods;
}

interface IComponentModel {
  template: string;
  usedProps?: string[];
  state?: State;
  methods?: Record<string, Function>;
  components?: Record<string, Function>;
}

export { IComponentOptions, Methods, Props, State, IComponentModel };
