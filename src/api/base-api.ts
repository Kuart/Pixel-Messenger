import { HTTPTransport } from '../utils';
import { BASE } from './const';

export class BaseAPI {
  http: HTTPTransport;

  constructor(path: string, defaultBase: string = BASE) {
    this.http = new HTTPTransport(defaultBase + path, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    });
  }
}
