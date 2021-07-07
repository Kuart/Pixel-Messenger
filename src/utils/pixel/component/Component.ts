import { COMPONENT_EVENTS } from '../../const';
import { Attributes, Parser } from '../parser';
import { NODE_TYPE, PixelDOM, VElement, VirtualNode } from '../pixelDom';
import EventBus from '../utils/EventBus';
import { Queue } from '../utils/structures';
import { IComponentOptions, Methods, Props, State } from './Component.type';

export default class Component {
  static EVENTS = {
    CDM: COMPONENT_EVENTS.CDM,
    SDU: 'state-did-update',
    PDU: 'props-did-update',
    RENDER: 'render',
    UNMOUNT: COMPONENT_EVENTS.CU,
  };

  public eventBus: EventBus;

  private pixelDom: PixelDOM;

  private parserInstant: Parser;

  private methods: Methods;

  private componentDidMountFunc: Function | null;

  private propHandlers?: Methods | undefined;

  template: string;

  type: string = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  keyIndex: number;

  domEl: HTMLElement;

  parent: Component | VElement;

  children: VirtualNode[];

  props: Props;

  usedProps: string[] = [];

  attrs: Attributes;

  state: State;

  constructor(options: IComponentOptions) {
    this.eventBus = new EventBus();
    this.pixelDom = new PixelDOM();
    this.parserInstant = options.parserInstant;

    this.tagName = options.tagName;
    this.template = options.template;
    this.children = [];
    this.keyIndex = 0;

    this.props = this.createProxyProps(options.props || {});
    this.state = this.createState(options.state || {});
    this.usedProps = options.usedProps || [];
    this.attrs = options.attrs || {};
    this.methods = options.methods || {};

    this.componentDidMountFunc = options.componentDidMount || null;

    this.propHandlers = options.propHandlers;

    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(Component.EVENTS.CDM, this.componentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.SDU, this.stateDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.PDU, this.render.bind(this));
    this.eventBus.on(Component.EVENTS.RENDER, this.render.bind(this));
    this.eventBus.on(Component.EVENTS.UNMOUNT, this.unmount.bind(this));
  }

  setParentVNode = (parent: Component | VElement) => {
    this.parent = parent;
    this.eventBus.emit(Component.EVENTS.CDM);
  };

  addListener(options: Methods[], name: string) {
    const self = this;
    options.forEach((eventConfig) => {
      eventConfig.target.addEventListener(eventConfig.event, self.methods[name].bind(self), true);
    });
  }

  componentDidMount() {
    if (this.componentDidMountFunc) {
      this.componentDidMountFunc();
    }
  }

  stateDidUpdate = (current: Props, next: Props, propName: string) => {
    if (current !== next) {
      this.compare(next, propName);
    }
  };

  render = () => {
    this.children = [];
    const updated = this.parserInstant.parseHTML(this.template, this);
    this.domEl = this.pixelDom.mountNode(this);
    this.parent.children[this.keyIndex] = updated;
    this.parent.domEl?.replaceChild(updated.domEl!, this.parent.domEl.childNodes[this.keyIndex]);
  };

  createProxyProps = (props: Props) => {
    const self = this;
    const validator = {
      get: (target: State, key: keyof State): unknown => {
        if (typeof target[key] === 'object' && target[key] !== null) {
          target[key].__proto__._name = key;
          return new Proxy(target[key] as State, validator);
        }

        return target[key];
      },
      set: (target: State, prop: string, value: unknown) => {
        const name: string = target && typeof target === 'object' ? target.__proto__._name : '';
        target[prop] = value;
        self.eventBus.emit(Component.EVENTS.PDU, { [prop]: target[prop] }, { [prop]: value }, name);
        return true;
      },
      deleteProperty: () => false,
    };

    return new Proxy(props, validator);
  };

  /* TODO change __proto__ */
  createState(state: State) {
    const self = this;
    const validator = {
      get: (target: State, key: keyof State): unknown => {
        if (typeof target[key] === 'object' && target[key] !== null) {
          target[key].__proto__._name = key;
          return new Proxy(target[key] as State, validator);
        }

        return target[key];
      },
      set: (target: State, prop: string, value: unknown) => {
        const name: string = target && typeof target === 'object' ? target.__proto__._name : '';
        target[prop] = value;
        self.eventBus.emit(Component.EVENTS.SDU, target[prop], { [prop]: value }, name);
        return true;
      },
      deleteProperty: () => false,
    };

    return new Proxy(state, validator);
  }

  /* TODO upde nodes/components */
  compare(props: Props, propName: string) {
    const [key] = Object.keys(props);
    const queue = new Queue<VirtualNode>();
    const reqCurrentPropQueue = new Queue<VirtualNode>();

    this.children.forEach((child) => queue.enqueue(child));

    while (!queue.isEmpty()) {
      const child = queue.dequeue();

      if (child.usedProps && child.usedProps.length) {
        const propsIndex = propName ? child.usedProps.indexOf(`${propName}.${key}`) : key;

        if (propsIndex !== -1 && 'children' in child) {
          child.children.forEach((childNode) => reqCurrentPropQueue.enqueue(childNode));
        } else if ('children' in child && child.children.length) {
          child.children.forEach((childNode) => queue.enqueue(childNode));
        }
      } else if ('children' in child && child.children.length) {
        child.children.forEach((childNode) => queue.enqueue(childNode));
      }
    }

    while (!reqCurrentPropQueue.isEmpty()) {
      const child = reqCurrentPropQueue.dequeue();

      if (child.usedProps && child.usedProps.length) {
        const propsIndex = child.usedProps.indexOf(propName);

        if (propsIndex !== -1) {
          if (child.type === NODE_TYPE.TEXT_NODE) {
            child.domEl.textContent = props[key];
          }
        }
      } else if ('children' in child && child.children.length) {
        child.children.forEach((childNode) => reqCurrentPropQueue.enqueue(childNode));
      }
    }
  }

  private unmount() {}
}
