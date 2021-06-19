export interface IMETHODS {
  GET: 'GET';
  POST: 'POST';
  PUT: 'PUT';
  DELETE: 'DELETE';
}

export interface IRequestOptions {
  data?: string | Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IXMLHttpRequestOptions extends IRequestOptions {
  method: keyof IMETHODS;
}
