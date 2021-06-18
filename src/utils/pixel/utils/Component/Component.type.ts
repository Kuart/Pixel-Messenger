import { Attributes } from '../../parser';

type Methods = Record<string, { event: string; name: string; target: HTMLElement; handler?: Function }>;
type Props = Record<string, string | number | boolean | [] | { [key: string]: unknown } | null | undefined | object>;
type State = Record<string, unknown>;

interface IComponentOptions {
  tagName: string;
  props?: Props;
  state?: State;
  attrs?: Attributes;
  methods?: Methods;
  propHandlers?: Methods;
}

interface IComponentModel {
  template: string;
  usedProps?: string[];
  state?: State;
  methods?: Record<string, Function>;
  components?: Record<string, Function>;
}

export { IComponentOptions, Methods, Props, State, IComponentModel };
