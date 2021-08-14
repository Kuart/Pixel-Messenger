/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { Parser } from '.';
import { PREFIXES } from './const';
import { IData } from './parser.type';
import { TagParser } from './tagParser';
import { slicePropStorage } from './utils';

const blankData: () => IData = () => ({ props: {}, state: {}, methods: {} });
const htmlString = (key: string = '', value: string = '', mod = '') => `<div ${mod}${key}="${value}"></div>`;

describe('Tag parser', () => {
  it('should return tagName', () => {
    const tagParser = new TagParser(Parser);

    const tagString = '<div>';

    expect(tagParser.parse(tagString, blankData())).to.include({ tagName: 'div' });
  });

  it('"slicePropStorage" should return first index after split', () => {
    const props = 'props.value';
    const state = 'state.value';
    const [pName] = slicePropStorage(props);
    const [sName] = slicePropStorage(state);

    expect(pName).equal('props');
    expect(sName).equal('state');
  });

  it('"slicePropStorage" should return path to prop in store', () => {
    const store = 'props';
    const pathVal = 'obj.value';
    const string = `${store}.${pathVal}`;
    const [pName, path] = slicePropStorage(string);

    expect(pName).equal('props');
    expect(path).equal(pathVal);
  });

  it('should return props with tag attributes', () => {
    const tagParser = new TagParser(Parser);

    const key = 'id';
    const value = 'test_id';

    const key1 = 'id';
    const value1 = 'test_id';

    const tagString = `<div ${key}="${value}" ${key1}="${value1}">`;

    expect(tagParser.parse(tagString, blankData()))
      .property('props')
      .to.include({ [key]: value, [key1]: value1 });
  });

  it(`should handle condition mod (${PREFIXES.CONDITION}) when boolen`, () => {
    const tagParser = new TagParser(Parser);
    const dataTruthy = blankData();
    const dataFalsy = blankData();

    const mod = PREFIXES.CONDITION;
    const keyTruthy = 'truthy';
    const keyFalsy = 'falsy';
    const value = 'props.condition';
    dataTruthy.props.condition = true;
    dataFalsy.props.condition = false;

    const tagStringTruthy = htmlString(keyTruthy, value, mod);
    const tagStringFalsy = htmlString(keyFalsy, value, mod);

    expect(tagParser.parse(tagStringTruthy, dataTruthy)).to.include({ isDisplay: true });
    expect(tagParser.parse(tagStringFalsy, dataTruthy)).to.include({ isDisplay: false });

    expect(tagParser.parse(tagStringTruthy, dataFalsy)).to.include({ isDisplay: false });
    expect(tagParser.parse(tagStringFalsy, dataFalsy)).to.include({ isDisplay: true });
  });

  it(`should handle condition mod (${PREFIXES.CONDITION}) when string`, () => {
    const tagParser = new TagParser(Parser);
    const dataTruthy = blankData();
    const dataFalsy = blankData();

    const mod = PREFIXES.CONDITION;
    const keyTruthy = 'truthy';
    const keyFalsy = 'falsy';
    const value = 'props.condition';
    dataTruthy.props.condition = 'string';
    dataFalsy.props.condition = '';

    const tagStringTruthy = htmlString(keyTruthy, value, mod);
    const tagStringFalsy = htmlString(keyFalsy, value, mod);

    expect(tagParser.parse(tagStringTruthy, dataTruthy)).to.include({ isDisplay: true });
    expect(tagParser.parse(tagStringFalsy, dataTruthy)).to.include({ isDisplay: false });

    expect(tagParser.parse(tagStringTruthy, dataFalsy)).to.include({ isDisplay: false });
    expect(tagParser.parse(tagStringFalsy, dataFalsy)).to.include({ isDisplay: true });
  });

  it(`should handle condition mod(${PREFIXES.CONDITION}) when array`, () => {
    const tagParser = new TagParser(Parser);
    const dataTruthy = blankData();
    const dataFalsy = blankData();

    const mod = PREFIXES.CONDITION;
    const keyTruthy = 'truthy';
    const keyFalsy = 'falsy';
    const value = 'props.condition';
    dataTruthy.props.condition = ['1'];
    dataFalsy.props.condition = [];

    const tagStringTruthy = htmlString(keyTruthy, value, mod);
    const tagStringFalsy = htmlString(keyFalsy, value, mod);

    expect(tagParser.parse(tagStringTruthy, dataTruthy)).to.include({ isDisplay: true });
    expect(tagParser.parse(tagStringFalsy, dataTruthy)).to.include({ isDisplay: false });

    expect(tagParser.parse(tagStringTruthy, dataFalsy)).to.include({ isDisplay: false });
    expect(tagParser.parse(tagStringFalsy, dataFalsy)).to.include({ isDisplay: true });
  });

  it(`should handle props mod (${PREFIXES.PROPS})`, () => {
    const tagParser = new TagParser(Parser);
    const data = blankData();
    const mod = PREFIXES.PROPS;
    const key = 'name';
    const valuePosit = 'property';
    const value = 'test_value';
    const tagString = htmlString(key, valuePosit, mod);

    data.props.property = value;

    expect(tagParser.parse(tagString, data))
      .property('props')
      .include({ [key]: value });
  });

  it(`should handle props mod (${PREFIXES.PROPS})`, () => {
    const tagParser = new TagParser(Parser);
    const data = blankData();
    const mod = PREFIXES.PROPS;
    const key = 'name';
    const valuePosit = 'property';
    const value = 'test_value';
    const tagString = htmlString(key, valuePosit, mod);

    data.props.property = value;

    expect(tagParser.parse(tagString, data))
      .property('props')
      .include({ [key]: value });
  });

  it(`should handle event mod (${PREFIXES.EVENT})`, () => {
    const tagParser = new TagParser(Parser);
    const data = blankData();
    const mod = PREFIXES.EVENT;
    const key = 'click';
    const valuePosit = 'methods.onClick';
    const returnValue = 'test';
    const fun = () => returnValue;

    const tagString = htmlString(key, valuePosit, mod);
    data.methods.onClick = fun;
    const parsed = tagParser.parse(tagString, data).events.get(key)!;
    expect(parsed()).equal(returnValue);
  });

  it(`should handle list mod (${PREFIXES.LIST})`, () => {
    const tagParser = new TagParser(Parser);
    const data = blankData();
    const mod = PREFIXES.LIST;
    const key = 'array';
    const valuePosit = 'props.list';

    const tagString = htmlString();
    const tagStringWothMap = htmlString(key, valuePosit, mod);
    expect(tagParser.parse(tagString, data)).property('listProps').to.be.equal(null);
    data.props.list = [{ name: 1 }, { name: 2 }];

    expect(tagParser.parse(tagStringWothMap, data)).include({ listProps: data.props.list });
  });
});
