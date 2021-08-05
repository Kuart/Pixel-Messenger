/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import NodeFabric from './NodeFabric';
import { VCommonNode, VComponentNode, VTextNode } from './Nodes';

describe('NodeFabric', () => {
  it('should return VTextNode', () => {
    const fabric = new NodeFabric();
    const textNode = fabric.create({ text: 'test' });

    expect(textNode).instanceof(VTextNode);
  });

  it('should return VCommonNode', () => {
    const fabric = new NodeFabric();
    const commonNode = fabric.create({ tagName: 'span', props: {}, events: new Map() });

    expect(commonNode).instanceof(VCommonNode);
  });

  it('should return VComponentNode', () => {
    const fabric = new NodeFabric();
    const commonNode = fabric.create(
      {
        name: 'TestComponent',
        template: '<div></div>',
        componentProps: {},
        events: new Map(),
        state: {},
        tagName: 'div',
        methods: {},
        props: {},
        componentDidMount: undefined,
        componentWillUnmount: undefined,
        componentDidUpdate: undefined,
      },
      { props: {}, children: [], tagName: 'div', events: new Map(), isDisplay: true, listProps: undefined }
    );

    expect(commonNode).instanceof(VComponentNode);
  });
});
