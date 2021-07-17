import { COMPONENT_EVENTS } from '../../../const';
import { NODE_TYPE } from '../pixelDom';
import { EventBus, bfsFirstParents, createProxyObject } from '../../utils';
import { EventHadnlerConfig, Listaner, Methods, Props, State } from './componentNode.type';
import { ParentNodeType, IComponentOptions } from './nodes.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';

export class VComponentNode extends VParentNode {
  static EVENTS = {
    CDM: COMPONENT_EVENTS.CDM,
    CDU: 'component-did-update',
    RENDER: 'render',
    UNMOUNT: COMPONENT_EVENTS.CU,
    PSU: COMPONENT_EVENTS.PSU,
  };

  type = NODE_TYPE.COMPONENT_NODE;

  public eventBus: EventBus;

  public methods: Methods;

  private componentDidMountFunc: Function | null;

  private eventHandlers: Map<string, Listaner> = new Map();

  template: string;

  name: string;

  tagName: string;

  pixelStore: Set<string> = new Set();

  state: State;

  constructor(options: IComponentOptions) {
    super();

    this.eventBus = new EventBus();
    this.name = options.name;
    this.tagName = options.tagName;

    this.keyIndex = 0;
    this.componentProps = createProxyObject(options.componentProps, this.defaultPropsHandler.bind(this));
    this.props = createProxyObject(options.props, this.defaultPropsHandler.bind(this));
    this.state = createProxyObject(options.state, this.defaultPropsHandler.bind(this));
    this.methods = options.methods || {};
    this.componentDidMountFunc = options.componentDidMount || null;

    this.registerEvents();
    this.conectToPixelStore(options);
  }

  registerEvents() {
    this.eventBus.on(VComponentNode.EVENTS.CDM, this.componentDidMount.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.CDU, this.componentDidUpdate.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.RENDER, this.redraw.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.UNMOUNT, this.unmount.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.PSU, this.pixelStoreUpdate.bind(this));
  }

  defaultPropsHandler(args: any) {
    this.eventBus.emit(VComponentNode.EVENTS.CDU, ...args);
  }

  conectToPixelStore(options: IComponentOptions) {
    if (options.pixelStore) {
      options.pixelStore.forEach((field: string) => {
        this.pixelStore.add(field);
        /*  this.parserInstant.instance.store.subscribe(field, this); */
      });
    }
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }

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

  setNewPixelStoreProps([field, value]: IPixelStoreUpdateProp) {
    if (field in this.props) {
      this.props[field] = value;
    }
  }

  findChildNodeForUpdate(field: string) {
    return bfsFirstParents(this, field);
  }

  pixelStoreUpdate([field, value]: [string, any]) {
    const nodes = this.findChildNodeForUpdate(field);
    nodes.forEach((node) => node.setNewPixelStoreProps([field, value]));
  }

  componentDidUpdate(current: Props, next: Props, propName: string) {
    const nodes = this.findChildNodeForUpdate(propName);
    const splited = propName.split('.');
    const field = splited[splited.length - 1];
  }

  redraw = () => {
    this.unmount();
    this.parent.domEl.removeChild(this.domEl);
    /* const updated = this.parserInstant.parseHTML(this.template, this); */

    /* this.domEl = this.pixelDom.mountNode(updated); */

    this.parent.domEl?.appendChild(this.domEl);
  };

  private unmount(isRootUnmount: boolean = false) {
    if (this.eventHandlers.size) {
      this.eventHandlers.forEach((_, key) => {
        this.removeEventListener(key);
      });
    }

    /* this.pixelStore.forEach((value: string) => {
      this.parserInstant.instance.store.unsubscribe(value, this);
    }); */

    if (!isRootUnmount) {
      this.children.forEach((child) => {
        this.domEl.removeChild(child.domEl);
      });
      this.children = [];
    }
  }

  private removeEventListener(name: string) {
    if (this.eventHandlers.has(name)) {
      const { target, type, listener } = this.eventHandlers.get(name)!;
      /* this.pixelDom.clearUnmountHadnler(name, target); */
      (target as any).removeEventListener(type, listener);
      this.eventHandlers.delete(name);
    }
  }
}
