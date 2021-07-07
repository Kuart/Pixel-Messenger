import { METHODS } from './methods.enum';

export interface IRequestOptions {
  data?: string | Record<string, any>;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IXMLHttpRequestOptions extends IRequestOptions {
  method: METHODS;
}
