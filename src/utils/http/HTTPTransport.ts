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

  baseHeaders: Record<string, string>;

  constructor(base: string, baseHeaders: Record<string, string>) {
    this.baseUrl = base;
    this.baseHeaders = baseHeaders;
  }

  get = <T>(url: string = '', options: IRequestOptions = {}): Promise<T> => {
    let currentUrl = url;

    if (options.data) {
      currentUrl = url + queryStringify(options.data);
    }

    return this.request(currentUrl, { ...options, method: METHODS.GET }, options.timeout) as Promise<T>;
  };

  put<T>(url: string = '', options: IRequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout) as Promise<T>;
  }

  post<T>(url: string = '', options: IRequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout) as Promise<T>;
  }

  delete<T>(url: string = '', options: IRequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout) as Promise<T>;
  }

  request(url: string = '', options: IXMLHttpRequestOptions, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, this.baseUrl + url);
      xhr.withCredentials = true;

      options.headers = { ...this.baseHeaders, ...options.headers };

      if (options && options.headers) {
        Object.keys(options.headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers![key]);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const parsed = JSON.parse(xhr.response);
            resolve(parsed);
          } catch (error) {
            resolve('');
          }
        } else {
          reject(JSON.parse(xhr.response));
        }
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
  }
}
