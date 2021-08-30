import { EVENTS } from '../../const';
import { ParentNodeType, VComponentNode } from '../pixelDom';
import { Pixel } from '../root';
import { ICurrentUserStore } from './store.type';

export class Store {
  static ERRORS = {
    missStoreField: (field: string) => `Store does't have field - ${field}`,
  };

  pixelInstance: typeof Pixel;

  protected authListenters: Record<string, any>[] = [];

  public currentUser: ICurrentUserStore;

  store: Record<string, any>;

  listeners: Record<string, ParentNodeType[]> = {};

  constructor(pixelInstance: typeof Pixel) {
    this.pixelInstance = pixelInstance;
    this.authListenters.push(this.pixelInstance.router);

    this.currentUser = this.createUserStore();
  }

  init(baseStore: Record<string, any> = {}) {
    this.store = this.createStore({ ...baseStore, currentUser: this.currentUser });
  }

  createStore(baseStore: Record<string, any>) {
    const self = this;
    const validator = {
      get: (target: Record<string, any>, key: string): unknown => target[key],
      set: (target: Record<string, any>, prop: string, value: unknown) => {
        if (prop in target) {
          target[prop] = value;
          self.emit(prop);
          return true;
        }

        console.error(Store.ERRORS.missStoreField(prop));

        return false;
      },
      deleteProperty: () => false,
    };

    return new Proxy(baseStore, validator);
  }

  createUserStore() {
    const self = this;
    const validator = {
      get: (target: ICurrentUserStore, key: string): unknown => target[key],
      set: (target: ICurrentUserStore, prop: string, value: unknown) => {
        target[prop] = value;

        if (prop === 'isAuth') {
          self.emitAuthListenters(value as boolean);
        }
        return true;
      },
      deleteProperty: () => false,
    };

    return new Proxy({ isAuth: false }, validator);
  }

  subscribe(field: string, listener: ParentNodeType) {
    if (!this.listeners[field]) {
      this.listeners[field] = [];
      this.store[field] = null;
    }

    this.listeners[field].push(listener);
  }

  unsubscribe = (event: string, listener: ParentNodeType) => {
    if (!this.listeners[event]) {
      throw new Error(`Event ${event} is undefined `);
    }

    this.listeners[event] = this.listeners[event].filter((item) => item !== listener);
  };

  forceUpdate = (field: string, component: VComponentNode) => {
    if (this.store[field]) {
      component.eventBus.emit(EVENTS.PSU, [field, this.store[field]]);
    }
  };

  dispatch(field: string, value: any) {
    this.store[field] = value;
  }

  setUserData(data: ICurrentUserStore) {
    Object.keys(data).forEach((key) => {
      this.currentUser[key] = data[key];
    });
  }

  protected emit = (field: string) => {
    if (this.listeners[field]) {
      this.listeners[field].forEach((listener) => {
        listener.eventBus.emit(EVENTS.PSU, [field, this.store[field]]);
      });
    }
  };

  protected emitAuthListenters = (isAuth: boolean) => {
    this.authListenters.forEach((listener) => {
      if (listener && listener.handleAuthChange) {
        listener.handleAuthChange(isAuth);
      }
    });
  };
}
