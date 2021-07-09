import { COMPONENT_EVENTS } from '../../const';
import { Component } from '../component';
import { Pixel } from '../root';
import { Router } from '../router';

interface ICurrentUserStore {
  isAuth: boolean;
  [key: string]: any;
}

export class Store {
  pixelInstantce: typeof Pixel;

  protected authListenters: Record<string, any>[] = [];

  public currentUser: ICurrentUserStore;

  store: Record<string, any>;

  listeners: Record<string, Component[]> = {};

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
          self.emitAuthListenters(value);
        }
        return true;
      },
      deleteProperty: () => false,
    };

    return new Proxy({ isAuth: false }, validator);
  }

  subscribe(field: string, listener: Component) {
    if (!this.listeners[field]) {
      this.listeners[field] = [];
      this.store[field] = null;
    }

    this.listeners[field].push(listener);
  }

  unsubscribe = (event: string, component: Component) => {
    if (!this.listeners[event]) {
      throw new Error(`Event ${event} is undefined `);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== component);
  };

  dispatch(field: string, value: any) {
    if (field in this.store) {
      this.store[field] = value;
    }
  }

  protected emit = (field: string) => {
    if (this.listeners[field]) {
      this.listeners[field].forEach((component) => {
        component.eventBus.emit(COMPONENT_EVENTS.PSU, this.store[field]);
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
