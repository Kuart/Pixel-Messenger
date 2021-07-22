import { EVENTS } from '../../../const';
import { NODE_TYPE, pixelDOM } from '../pixelDom';
import { createProxyObject } from '../../utils';
import { Props, State, Methods } from './componentNode.type';
import { ParentNodeType, IComponentOptions } from './nodes.type';
import { VParentNode } from './abstract';
import { IPixelStoreUpdateProp } from '../../store';
import { Parser } from '../../parser';

export class VComponentNode extends VParentNode {
  static EVENTS = {
    CDM: EVENTS.NDM,
    CDU: 'component-did-update',
    CU: EVENTS.NU,
    PSU: EVENTS.PSU,
  };

  type = NODE_TYPE.COMPONENT_NODE;

  tagName: string;

  name: string;

  private componentDidMountFunc: Function | null;

  pixelStore: Set<string> = new Set();

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
    /* node added to DOM */
    this.eventBus.on(VComponentNode.EVENTS.CDM, this.nodeDidMount.bind(this, this.componentDidMount.bind(this)));
    this.eventBus.on(VComponentNode.EVENTS.CDU, this.componentDidUpdate.bind(this));
    /*  node removed from DOM */
    this.eventBus.on(VComponentNode.EVENTS.CU, this.nodeUnmount.bind(this));
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

  componentDidUpdate() {
    const newTree = Parser.componentParser.reParse(this.name, this.componentProps);
    pixelDOM.patch(this, newTree);
  }

  setNewPixelStoreProps([field, value]: IPixelStoreUpdateProp) {
    if (field in this.props) {
      this.props[field] = value;
    }
  }
}
