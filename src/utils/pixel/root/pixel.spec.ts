/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import Pixel from './pixel';
import { Router } from '../router';
import { Store } from '../store';
import { Parser } from '../parser';
import { pixelDOM } from '../pixelDom';

const selector = '#root';

const { component } = {
  component: {
    state: '',
    template: '<div>1</div>',
  },
};

const components = {
  Test: () => component,
};

describe('Pixel root', () => {
  it('should have store and router', () => {
    expect(Pixel).haveOwnProperty('router').instanceOf(Router);
    expect(Pixel).haveOwnProperty('store').instanceOf(Store);
  });

  it('method "registerComponents" should register components', () => {
    Pixel.registerComponents(components);
    expect(Pixel.components).property('Test');
  });

  it('method "callComponentModel" should return register component object', () => {
    expect(Pixel.components.Test()).equal(component);
  });

  it('method "setRootEl" should set link for valid dom node', () => {
    Pixel.setRootEl(selector);
    expect(Pixel.root).equal(document.querySelector(selector));
  });

  it('method "mount" should add VDOM to the real dom node (root) as child', () => {
    const node = pixelDOM.nodeFabric.create({ tagName: 'div', props: { id: 'root_child' }, events: new Map() });

    Pixel.mount(node as any);

    const rootFirstChild = window.document.querySelector(selector)?.childNodes[0];

    expect(rootFirstChild).to.equal(node.domEl);
  });
});
