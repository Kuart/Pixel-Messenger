/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { VCommonNode } from '../pixelDom';
import { PixelDOM } from '../pixelDom/pixelDom';
import { Pixel } from '../root';
import { Store } from './store';

describe('Global store', () => {
  it('should have pixel instance', () => {
    const store = new Store(Pixel);
    expect(store.pixelInstance).to.not.equal(undefined);
  });

  it('should subscribe', () => {
    const store = new Store(Pixel);
    const pixelDOM = new PixelDOM();
    const commonNode = pixelDOM.nodeFabric.create({ tagName: 'span', props: {}, events: new Map() }) as VCommonNode;
    store.listeners.test_field = [];

    expect(store.listeners).property('test_field').to.have.length(0);
    store.subscribe('test_field', commonNode);
    expect(store.listeners).property('test_field').to.have.length(1);
  });

  it('should unsubscribe', () => {
    const store = new Store(Pixel);
    const pixelDOM = new PixelDOM();
    const commonNode = pixelDOM.nodeFabric.create({ tagName: 'span', props: {}, events: new Map() }) as VCommonNode;
    store.listeners.test_field = [];

    store.subscribe('test_field', commonNode);
    expect(store.listeners).property('test_field').to.have.length(1);
    store.unsubscribe('test_field', commonNode);
    expect(store.listeners).property('test_field').to.have.length(0);
  });

  it('init should create store', () => {
    const store = new Store(Pixel);
    expect(store.store).to.be.equal(undefined);
    store.init();
    expect(store.store).to.be.not.equal(undefined);
  });

  it('dispatch should set field value', () => {
    const store = new Store(Pixel);
    store.init({ test_value: '' });
    store.dispatch('test_value', 'value');
    expect(store.store).property('test_value').to.be.equal('value');
  });
});
