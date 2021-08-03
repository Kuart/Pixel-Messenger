/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { Parser } from '.';
import { ComponentParser } from './componentParser';

describe('Component parser', () => {
  it('should have parser instance', () => {
    const parserComp = new ComponentParser(Parser);
    expect(parserComp.parserInstance).to.not.equal(undefined);
  });
});
