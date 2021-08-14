import { METHODS } from './methods.enum';

export interface IRequestOptions {
  data?: string | Record<string, any>;
  timeout?: number;
  headers?: Record<string, string>;
  isNoHeader?: boolean;
}

export interface IXMLHttpRequestOptions extends IRequestOptions {
  method: METHODS;
}
