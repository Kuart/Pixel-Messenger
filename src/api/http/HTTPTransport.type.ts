import { METHODS } from './const';

export interface IRequestOptions {
  data?: string | Record<string, object>;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IXMLHttpRequestOptions extends IRequestOptions {
  method: METHODS;
}
