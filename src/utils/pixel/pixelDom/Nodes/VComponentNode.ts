import { EVENTS } from '../../../const';
import { NODE_TYPE, pixelDOM } from '../pixelDom';
import { createProxyObject } from '../../utils';
import { Props, State, Methods } from './componentNode.type';
import { ParentNodeType, IComponentOptions } from './nodes.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';
import { Parser } from '../../parser';
import { PixelStore } from '../../root';

export class VComponentNode extends VParentNode {
  static EVENTS = {
    CDM: EVENTS.NDM,
    CDU: 'component-did-update',
    CU: EVENTS.NU,
    PSU: EVENTS.PSU,
  };

  timer: number;

  type = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  name: string;

  private componentDidMountFunc: Function | null;

  private componentWillUnmountFunc: Function | null;

  private componentDidUpdateFunc: Function | null;

  pixelStore: Set<string> = new Set();

  pixelStoreFields: string[] = [];

  methods: Methods;

  state: State;

  componentProps: Props;

  constructor(options: IComponentOptions) {
    super();

    this.name = options.name;

    this.keyIndex = 0;
    this.methods = options.methods;
    this.componentProps = createProxyObject(options.componentProps, this.defaultPropsHandler.bind(this));
    this.state = createProxyObject(options.state, this.defaultPropsHandler.bind(this));
    this.componentDidMountFunc = options.componentDidMount || null;
    this.componentWillUnmountFunc = options.componentWillUnmount || null;
    this.componentDidUpdateFunc = options.componentDidUpdate || null;
    this.pixelStoreFields = options.pixelStore;
    this.registerEvents();
  }

  init(options: ParentNodeType) {
    this.props = createProxyObject(options.props, this.defaultPropsHandler.bind(this));
    this.eventHandlers = options.eventHandlers;
    this.tagName = options.tagName;
    this.children = options.children || [];
  }

  updateProps(props: Props) {
    this.props = createProxyObject(props, this.defaultPropsHandler.bind(this));
  }

  registerEvents() {
    /* node added to DOM */
    this.eventBus.on(VComponentNode.EVENTS.CDM, this.nodeDidMount.bind(this, this.componentDidMount.bind(this)));
    this.eventBus.on(VComponentNode.EVENTS.CDU, this.componentDidUpdate.bind(this));
    /*  node removed from DOM */
    this.eventBus.on(VComponentNode.EVENTS.CU, this.nodeUnmount.bind(this, this.componentWillUnmount.bind(this)));
    /*  pixel store update */
    this.eventBus.on(VComponentNode.EVENTS.PSU, this.setNewPixelStoreProps.bind(this));
  }

  defaultPropsHandler(args: any) {
    this.eventBus.emit(VComponentNode.EVENTS.CDU, ...args);
  }

  conectToPixelStore(fields: string[]) {
    if (fields) {
      fields.forEach((field: string) => {
        if (!this.pixelStore.has(field)) {
          this.pixelStore.add(field);
          PixelStore.subscribe(field, this);
          PixelStore.forceUpdate(field, this);
        }
      });
    }
  }

  setParentNode(parent: ParentNodeType) {
    this.parent = parent;
  }

  componentDidMount() {
    this.conectToPixelStore(this.pixelStoreFields);

    if (this.componentDidMountFunc) {
      this.componentDidMountFunc.call(this, this);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      const newTree = Parser.componentParser.reParse(this.name, this);

      pixelDOM.patch(this, newTree);

      if (this.componentDidUpdateFunc) {
        this.componentDidUpdateFunc(oldProps, newProps);
      }
    }, 150);
  }

  componentWillUnmount() {
    if (this.componentWillUnmountFunc) {
      this.componentWillUnmountFunc.call(this, this);
    }

    if (this.pixelStore.size) {
      this.pixelStore.forEach((field) => {
        PixelStore.unsubscribe(field, this);
      });
    }
  }

  setNewPixelStoreProps([field, value]: IPixelStoreUpdateProp) {
    if (field in this.state) {
      this.state[field] = value;
    }
  }
}
