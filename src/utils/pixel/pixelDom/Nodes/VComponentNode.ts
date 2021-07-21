import { EVENTS } from '../../../const';
import { NODE_TYPE } from '../pixelDom';
import { createProxyObject } from '../../utils';
import { Props, State } from './componentNode.type';
import { ParentNodeType, IComponentOptions, IInitOptions } from './nodes.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';

export class VComponentNode extends VParentNode {
  static EVENTS = {
    CWM: EVENTS.NWM,
    CDM: EVENTS.CDM,
    CDU: 'component-did-update',
    CU: EVENTS.NU,
    RENDER: 'render',
    PSU: EVENTS.PSU,
  };

  type = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  name: string;

  private componentDidMountFunc: Function | null;

  pixelStore: Set<string> = new Set();

  state: State;

  componentProps: Props;

  constructor(options: IComponentOptions) {
    super();

    this.name = options.name;

    this.keyIndex = 0;
    this.componentProps = createProxyObject(options.componentProps, this.defaultPropsHandler.bind(this));
    this.state = createProxyObject(options.state, this.defaultPropsHandler.bind(this));
    this.componentDidMountFunc = options.componentDidMount || null;

    this.registerEvents();
    this.conectToPixelStore(options);
  }

  init(options: ParentNodeType) {
    this.props = createProxyObject(options.props, this.defaultPropsHandler.bind(this));
    this.eventHandlers = options.eventHandlers;
    this.tagName = options.tagName;
    this.children = options.children || [];
  }

  registerEvents() {
    /* dom node created but not insert to DOM */
    this.eventBus.on(VComponentNode.EVENTS.CWM, this.nodeWillMount.bind(this));
    /* node added to DOM */
    this.eventBus.on(VComponentNode.EVENTS.CDM, this.componentDidMount.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.CDU, this.componentDidUpdate.bind(this));
    /*  node removed from DOM */
    this.eventBus.on(VComponentNode.EVENTS.CU, this.nodeUnmount.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.RENDER, this.redraw.bind(this));
    /* this.eventBus.on(VComponentNode.EVENTS.PSU, this.pixelStoreUpdate.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.PSU, this.pixelStoreUpdate.bind(this)); */
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

  componentDidMount() {
    if (this.componentDidMountFunc) {
      this.componentDidMountFunc();
    }
  }

  componentDidUpdate() {}

  setNewPixelStoreProps([field, value]: IPixelStoreUpdateProp) {
    if (field in this.props) {
      this.props[field] = value;
    }
  }

  redraw = () => {};
}
