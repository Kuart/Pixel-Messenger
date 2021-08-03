/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { Parser } from '.';
import { VCommonNode, VComponentNode, VTextNode } from '../pixelDom';
import PixelRoot from '../root/pixel';

describe('Parser', () => {
  it('method "isComponent" should return value if string is component type', () => {
    const html = '<Component />';
    expect(Parser.isComponent(html)).to.not.equal(null);
  });

  it('method "isComponent" should return null if string is common html', () => {
    const html = '<div><div>';
    expect(Parser.isComponent(html)).to.be.equal(null);
  });

  it('method "isXHTML" should return true if string is html tag />', () => {
    const html = '<input />';
    expect(Parser.isXHTML(html)).to.not.equal(null);
  });

  it('method "isXHTML" should return false if string is not html tag />', () => {
    const html = '<div><div>';
    expect(Parser.isXHTML(html)).to.be.equal(false);
  });

  it('method "parseHTML" should return VCommonNode with correct tag', () => {
    const html = '<div><div>';
    expect(Parser.parseHTML(html)).instanceOf(VCommonNode);
    expect(Parser.parseHTML(html)).property('tagName').equal('div');
  });

  it('method "parseHTML" should return VCommonNode with VTextNode child', () => {
    const html = '<div>test</div>';
    expect(Parser.parseHTML(html)).instanceOf(VCommonNode);
    expect(Parser.parseHTML(html).children[0]).instanceOf(VTextNode);
  });

  it('method "parseHTML" should return VCommonNode with VTextNode correct text', () => {
    const text = 'test';
    const html = `<div>${text}</div>`;
    expect(Parser.parseHTML(html)).instanceOf(VCommonNode);
    expect(Parser.parseHTML(html).children[0]).property('text').equal(text);
  });

  it('method "parseHTML" should return VComponentNode', () => {
    const template = '<div></div>';

    PixelRoot.registerComponents({
      ParserTest: () => ({
        template,
      }),
    });

    expect(Parser.parseHTML('<ParserTest />')).instanceOf(VComponentNode);
  });

  it('method "parseHTML" should return VComponentNode width correct propertys', () => {
    expect(Parser.parseHTML('<ParserTest />')).property('tagName').equal('div');
    expect(Parser.parseHTML('<ParserTest />')).property('name').equal('ParserTest');
  });
});
