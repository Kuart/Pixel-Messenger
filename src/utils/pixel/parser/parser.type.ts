import { Props, State, Methods, VirtualNode, EventHandler } from '../pixelDom';

interface IParsedTag {
  tagName: string;
  props: Props;
  events: EventHandler;
  isDisplay: boolean;
  children?: VirtualNode[];
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

interface IParentData {
  componentProps: Props;
  state: State;
  methods: Methods;
}

type ISliceStore = [keyof IPropStorages, string];
type ISliceStoreWithAlt = [keyof IPropStorages, string, keyof IPropStorages | string, string];

export { IParsedTag, IData, IPropStorages, ISliceStore, ISliceStoreWithAlt, IParentData };
