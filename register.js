const tsNode = require('ts-node');
const jsdom = require('./node_modules/jsdom');

const { window } = new jsdom.JSDOM('<html><head></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
});
global.window = window;
global.document = window.document;

tsNode.register({
  files: true,
  transpileOnly: true,
  project: './tsconfig.json',
});
