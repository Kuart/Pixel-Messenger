import { Attributes, Parser } from '../parser';

type Methods = Record<string, { event: string; name: string; target?: HTMLElement; handler?: Function }>;
type Props = Record<string, string | number | boolean | [] | { [key: string]: unknown } | null | undefined | object>;
type State = Record<string, any>;

interface IComponentOptions {
  tagName: string;
  template: string;
  parserInstant: Parser;
  props?: Props;
  state?: State;
  attrs?: Attributes;
  methods?: Methods;
  propHandlers?: Methods;
  usedProps?: string[];
  componentDidMount?: Function;
}

interface IComponentModel {
  template: string;
  usedProps?: string[];
  state?: State;
  methods?: Record<string, Function>;
  componentDidMount?: Function;
  components?: Record<string, Function>;
}

export { IComponentOptions, Methods, Props, State, IComponentModel };
