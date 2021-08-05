/* eslint no-undef: [0, { typeof: true }] */
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport';

const url = 'https:/ya-praktikum.tech/api/v2';

describe('HTTPTransport', () => {
  it('should have get/post/put/delete methods', () => {
    const http = new HTTPTransport(url, {});
    expect(http).include.any.keys('get', 'post', 'put', 'delete');
  });
});
