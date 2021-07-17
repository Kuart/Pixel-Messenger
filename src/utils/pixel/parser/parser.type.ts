import { Props, State, Methods } from '../pixelDom';

interface IParsedTag {
  tagName: string;
  props: Props;
}

interface IPropStorages {
  props: 'props';
  state: 'state';
  methods: 'methods';
}
interface IData {
  props: Props;
  state: State;
  methods: Methods;
}

export { IParsedTag, IData, IPropStorages };
