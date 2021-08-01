import { expect } from 'chai';
import { JSDOM } from 'jsdom';

import Router from './router';

describe('Router', () => {
  describe('toggleButton', () => {
    beforeEach(() => {
      const dom = new JSDOM(
      ``,
     { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });
})
