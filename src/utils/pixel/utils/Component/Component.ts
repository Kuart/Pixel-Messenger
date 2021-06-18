import { Attributes } from '../../parser';
import { NODE_TYPE, PixelDOM, VirtualNode } from '../../pixelDom';
import EventBus from '../EventBus';
import { IComponentOptions, Methods, Props, State } from './Component.type';

export default class Component {
  static EVENTS = {
    CDM: 'component-did-mount',
    CDU: 'component-did-update',
    RENDER: 'render',
  };

  eventBus: EventBus;

  pixelDom: PixelDOM;

  type: string = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  keyIndex: number | null;

  domEl: HTMLElement;

  parent: HTMLElement;

  children: VirtualNode[];

  props: Props;

  attrs: Attributes;

  state: State;

  methods: Methods;

  listeners: [] = [];

  propHandlers?: Methods | undefined;

  constructor(options: IComponentOptions) {
    this.eventBus = new EventBus();
    this.pixelDom = new PixelDOM();

    this.tagName = options.tagName;
    this.children = [];
    this.keyIndex = null;

    this.props = this.makeProxy(options.props || {});
    this.state = this.createState(options.state || {});
    this.attrs = options.attrs;
    this.methods = options.methods ? options.methods : null;

    this.propHandlers = options.propHandlers;

    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(Component.EVENTS.CDM, this.componentDidMount);
    this.eventBus.on(Component.EVENTS.CDU, this.componentDidUpdate);
    this.eventBus.on(Component.EVENTS.RENDER, this.render);
  }

  setParentNode = (parent: HTMLElement) => {
    this.parent = parent;
    this.eventBus.emit(Component.EVENTS.CDM);
  };

  addListener = (options: Methods[], name: string) => {
    options.forEach((eventConfig) => {
      eventConfig.target.addEventListener(eventConfig.event, this.methods[name].bind(this));
    });
  };

  componentDidMount = () => {
    /* console.log('mount'); */
  };

  componentDidUpdate = (i: any, b: any) => {
    console.log(i, b);
  };

  render = () => {};

  makeProxy = (object: any) => {
    return new Proxy(object, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop] = value;
        console.log(value);
        this.eventBus.emit(Component.EVENTS.CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  };

  createState(state: State) {
    const validator = {
      get: function (target: State, key: keyof State): unknown {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key] as State, validator);
        } else {
          return target[key];
        }
      },
      set: function (target: State, prop: string, value: unknown) {
        target[prop] = value;
        return true;
      },
      deleteProperty: function () {
        return false;
      },
    };

    return new Proxy(state, validator);
  }
}
