import { METHODS } from './const';
import { IRequestOptions, IXMLHttpRequestOptions } from './HTTPTransport.type';

function queryStringify(data: string | Record<string, unknown>) {
  if (typeof data === 'string') {
    if (data.startsWith('?')) {
      return data;
    } else return '?' + data;
  } else {
    let query = parseObject(data);
    if (query.length) {
      return (query = `?${query.substring(1)}`);
    }

    return '';
  }
}

function parseObject(obj: Record<string, unknown>) {
  let query = '';
  for (const key in obj) {
    if (typeof obj[key] !== 'object') {
      query += `&${key}=${obj[key]}`;
    } else if (Array.isArray(obj[key])) {
      query += `&${key}=${(obj[key] as []).join(',')}`;
    } else {
      query += `&${key}=${obj[key]}`;
    }
  }
  return query;
}

export class HTTPTransport {
  get = (url: string, options: IRequestOptions = {}) => {
    let currentUrl = url;

    if (options.data) {
      currentUrl = url + queryStringify(options.data);
    }

    return this.request(currentUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: IRequestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: IRequestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: IRequestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: IXMLHttpRequestOptions, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, url);

      if (options.headers) {
        for (const key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = reject;

      if (options.method === METHODS.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(options.data ? options.data : {}));
      }
    });
  };
}
