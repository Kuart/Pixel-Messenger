import { METHODS } from './methods.enum';
import { IRequestOptions, IXMLHttpRequestOptions } from './HTTPTransport.type';

function parseObject(obj: Record<string, object>) {
  return Object.entries(obj).reduce((acc: string, [key, value]: [string, any]) => {
    if (typeof value !== 'object') {
      acc += `&${key}=${value}`;
    } else if (Array.isArray(value)) {
      acc += `&${key}=${value.join(',')}`;
    } else if (typeof value === 'object' && value !== null) {
      acc += `${parseObject(value)}`;
    }

    return acc;
  }, '');
}

function queryStringify(data: string | Record<string, object>) {
  if (typeof data === 'string') {
    if (data.startsWith('?')) {
      return data;
    }
    return `? + ${data}`;
  }

  const query = parseObject(data);

  if (query.length) {
    return `?${query.substring(1)}`;
  }

  return '';
}

export class HTTPTransport {
  baseUrl: string;

  constructor(base: string) {
    this.baseUrl = base;
  }

  get = (url: string = '', options: IRequestOptions = {}) => {
    let currentUrl = url;

    if (options.data) {
      currentUrl = url + queryStringify(options.data);
    }

    return this.request(currentUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  put(url: string = '', options: IRequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  post(url: string = '', options: IRequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  delete(url: string = '', options: IRequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request = (url: string = '', options: IXMLHttpRequestOptions, timeout = 5000) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, this.baseUrl + url);

      if (options && options.headers) {
        Object.keys(options.headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers![key]);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = reject;

      if (options.method === METHODS.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(options.data ? options.data : {}));
      }
    });

    return promise;
  };
}
