/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { VCommonNode, VTextNode } from './Nodes';
import { PixelDOM } from './pixelDom';

describe('PixelDOM', () => {
  it('should have NodeFabric instance', () => {
    const instance = new PixelDOM();

    expect(instance.nodeFabric).to.be.not.equal(undefined);
  });

  it('should set domEl prop as Text', () => {
    const instance = new PixelDOM();
    const textNode = instance.nodeFabric.create({ text: 'test' }) as VTextNode;
    const node = instance.mountTextNode(textNode);

    expect(node.domEl).to.be.not.equal(undefined);
  });

  it('should set domEl prop as HTMLElement', () => {
    const instance = new PixelDOM();
    const commonNode = instance.nodeFabric.create({ tagName: 'span', props: {}, events: new Map() }) as VCommonNode;

    const node = instance.mountNode(commonNode);
    expect(node.domEl).to.be.not.equal(undefined);
  });
});
