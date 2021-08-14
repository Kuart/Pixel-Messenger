/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { Parser } from '.';
import { VComponentNode } from '../pixelDom';
import PixelRoot from '../root/pixel';
import { ComponentParser } from './componentParser';
import { PREFIXES } from './const';

const blankData: () => IData = () => ({ props: {}, state: {}, methods: {} });
const htmlString = (key: string = '', value: string = '', mod = '') =>
  `<ComponentParserTest ${mod}${key}="${value}" />`;

describe('Component parser', () => {
  beforeEach(() => {
    PixelRoot.components = {};
  });

  it('should have parser instance', () => {
    const parserComp = new ComponentParser(Parser);
    expect(parserComp.parserInstance).to.not.equal(undefined);
  });

  it('should return VComponentNode', () => {
    const parserComp = new ComponentParser(Parser);
    const template = '<div></div>';

    PixelRoot.registerComponents({
      ComponentParserTest: () => ({
        template,
      }),
    });

    expect(parserComp.parse('<ComponentParserTest />')).instanceOf(VComponentNode);
  });

  it('VComponentNode should have componentProps with inline props', () => {
    const parserComp = new ComponentParser(Parser);
    const template = '<div></div>';

    PixelRoot.registerComponents({
      ComponentParserTest: () => ({
        template,
      }),
    });

    const key = 'name';
    const value = 'test_value';

    const componentHtml = `<ComponentParserTest ${key}="${value}" />`;

    expect(parserComp.parse(componentHtml))
      .property('componentProps')
      .include({ [key]: value });
  });

  it('VComponentNode template should have props with binded state value', () => {
    const parserComp = new ComponentParser(Parser);
    const template = '<div b:class="state.class"></div>';
    const value = 'test_value';

    PixelRoot.registerComponents({
      ComponentParserTest: () => ({
        state: {
          class: value,
        },
        template,
      }),
    });

    const key = 'class';
    const bValue = 'state.testClass';

    const html = htmlString(key, bValue, PREFIXES.BIND);

    expect(parserComp.parse(html))
      .property('props')
      .include({ [key]: value });
  });
});
