import { COMPONENT_EVENTS } from '../../const';
import { Attributes, Parser } from '../parser';
import { NODE_TYPE, PixelDOM, VElement, VirtualNode } from '../pixelDom';
import EventBus from '../utils/EventBus';
import { Queue } from '../utils/structures';
import { EventHadnlerConfig, IComponentOptions, Listaner, Methods, Props, State } from './Component.type';

export default class Component {
  static EVENTS = {
    CDM: COMPONENT_EVENTS.CDM,
    SDU: 'state-did-update',
    PDU: 'props-did-update',
    RENDER: 'render',
    UNMOUNT: COMPONENT_EVENTS.CU,
    PSU: COMPONENT_EVENTS.PSU,
  };

  public eventBus: EventBus;

  private pixelDom: PixelDOM;

  private parserInstant: Parser;

  public methods: Methods;

  private componentDidMountFunc: Function | null;

  public propHandlers?: Methods | undefined;

  private eventHandlers: Map<string, Listaner> = new Map();

  template: string;

  name: string;

  type: string = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  keyIndex: number;

  domEl: HTMLElement;

  parent: Component | VElement;

  children: VirtualNode[];

  props: Props;

  usedProps: string[] = [];

  pixelStore: Set<string> = new Set();

  attrs: Attributes;

  state: State;

  constructor(options: IComponentOptions) {
    this.eventBus = new EventBus();
    this.pixelDom = new PixelDOM();

    this.parserInstant = options.parserInstant;
    this.name = options.componentName;

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
    this.conectToPixelStore(options);
  }

  registerEvents() {
    this.eventBus.on(Component.EVENTS.CDM, this.componentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.SDU, this.stateDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.PDU, this.render.bind(this));
    this.eventBus.on(Component.EVENTS.RENDER, this.render.bind(this));
    this.eventBus.on(Component.EVENTS.UNMOUNT, this.unmount.bind(this));
    this.eventBus.on(Component.EVENTS.PSU, this.pixelStoreUpdate.bind(this));
  }

  conectToPixelStore(options: IComponentOptions) {
    if (options.pixelStore) {
      options.pixelStore.forEach((field: string) => {
        this.pixelStore.add(field);
        this.parserInstant.instance.store.subscribe(field, this);
      });
    }
  }

  setParentVNode = (parent: Component | VElement) => {
    this.parent = parent;
  };

  addListener(options: EventHadnlerConfig, name: string) {
    const self = this;
    let listener = null;

    const { target, event } = options;

    if (target) {
      if (self.eventHandlers.has(name)) {
        this.removeEventListener(name);
      }

      listener = self.methods[name].bind(self);
      target.addEventListener(options.event, listener, true);
      self.eventHandlers.set(name, { target, type: event, listener });
    }
  }

  componentDidMount() {
    if (this.componentDidMountFunc) {
      this.componentDidMountFunc();
    }
  }

  pixelStoreUpdate() {
    this.render();
  }

  stateDidUpdate = (current: Props, next: Props, propName: string) => {
    if (current !== next) {
      this.compare(next, propName);
    }
  };

  render = () => {
    this.children = [];
    this.unmount();
    const updated = this.parserInstant.parseHTML(`<${this.name} />`, this);
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

  private unmount() {
    if (this.eventHandlers.size) {
      this.eventHandlers.forEach((_, key) => {
        this.removeEventListener(key);
      });
    }
  }

  private removeEventListener(name: string) {
    if (this.eventHandlers.has(name)) {
      const { target, type, listener } = this.eventHandlers.get(name)!;
      this.pixelDom.clearUnmountHadnler(name);
      (target as any).removeEventListener(type, listener);
      this.eventHandlers.delete(name);
    }
  }
}
