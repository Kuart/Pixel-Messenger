import { EVENTS } from '../../const';
import { ParentNodeType } from '../pixelDom';
import { Pixel } from '../root';
import { ICurrentUserStore } from './store.type';

export class Store {
  pixelInstantce: typeof Pixel;

  protected authListenters: Record<string, any>[] = [];

  public currentUser: ICurrentUserStore;

  store: Record<string, any>;

  listeners: Record<string, ParentNodeType[]> = {};

  constructor(pixelInstantce: typeof Pixel) {
    this.pixelInstantce = pixelInstantce;
    this.store = this.createStore();
    this.authListenters.push(this.pixelInstantce.router);

    this.currentUser = this.createUserStore();
  }

  createStore() {
    const self = this;
    const validator = {
      get: (target: Record<string, any>, key: string): unknown => target[key],
      set: (target: Record<string, any>, prop: string, value: unknown) => {
        target[prop] = value;
        self.emit(prop);
        return true;
      },
      deleteProperty: () => false,
    };

    return new Proxy({}, validator);
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
