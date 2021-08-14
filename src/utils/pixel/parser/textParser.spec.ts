/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { Parser } from '.';
import { VTextNode } from '../pixelDom';
import { IData } from './parser.type';
import { TextParser } from './textParser';

const blankData: () => IData = () => ({ props: {}, state: {}, methods: {} });

describe('Text parser', () => {
  it('should return VTextNode', () => {
    const text = 'test';
    const textParser = new TextParser(Parser);
    const textNode = textParser.parse(text, blankData());
    expect(textNode).instanceof(VTextNode);
  });

  it('VTextNode should have "text" prop value eq taken arg', () => {
    const text = 'test';
    const textParser = new TextParser(Parser);
    const textNode = textParser.parse(text, blankData());
    expect(textNode).property('text').equal(text);
  });

  it('should handle mustache syntax for props', () => {
    const textParser = new TextParser(Parser);

    const template = '{{props.text}}';
    const text = 'test';
    const data = blankData();
    data.props.text = text;

    const textNode = textParser.parse(template, data);

    expect(textNode).property('text').equal(text);
  });

  it('should handle mustache syntax for state', () => {
    const textParser = new TextParser(Parser);

    const template = '{{state.text}}';
    const text = 'test';
    const data = blankData();
    data.state.text = text;

    const textNode = textParser.parse(template, data);

    expect(textNode).property('text').equal(text);
  });

  it('if parse mustache syntax should write {key: value} in own props', () => {
    const textParser = new TextParser(Parser);

    const template = '{{state.text}}';
    const text = 'test';
    const data = blankData();
    data.state.text = text;

    const textNode = textParser.parse(template, data);

    expect(textNode).property('props').has.property('text');
    expect(textNode).property('props').property('text').equal(text);
  });
});
