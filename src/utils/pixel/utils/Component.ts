import { NODE_TYPE, PixelDOM, VNode, VTextNode } from '../pixelDom';
import EventBus from './EventBus';

export interface ICompOptions {
  props: Record<string, unknown>;
  tagName: string;
}

export default class Component {
  static EVENTS = {
    CDM: 'component-did-mount',
    CDU: 'component-did-update',
    RENDER: 'render',
  };

  type: string = NODE_TYPE.COMPONENT_NODE;

  eventBus: EventBus;

  pixelDom: PixelDOM;

  props: any;

  tagName: string;

  keyIndex: number | null;

  domEl: HTMLElement;

  parent: HTMLElement;

  children: (VNode | VTextNode | Component)[];

  constructor(options: ICompOptions) {
    this.eventBus = new EventBus();
    this.pixelDom = new PixelDOM();

    this.tagName = options.tagName;
    this.children = [];
    this.keyIndex = null;

    this.props = this.makePropsProxy(options.props);
    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(Component.EVENTS.CDM, this.componentDidMount);
    this.eventBus.on(Component.EVENTS.CDU, this.componentDidUpdate);
    this.eventBus.on(Component.EVENTS.RENDER, this.render);
  }

  init = () => {};

  setParentNode = (parent: HTMLElement) => {
    this.parent = parent;
    this.eventBus.emit(Component.EVENTS.CDM);
  };

  componentDidMount() {
    console.log('mount');
  }

  componentDidUpdate(i: any, b: any) {
    console.log(i, b);
  }

  render() {}

  makePropsProxy = (props: any) => {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        this.eventBus.emit(Component.EVENTS.CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  };
}
