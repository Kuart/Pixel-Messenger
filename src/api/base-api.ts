import { HTTPTransport } from '../utils';

export class BaseAPI {
  http: HTTPTransport;

  constructor(base: string) {
    this.http = new HTTPTransport(base, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    });
  }
}
