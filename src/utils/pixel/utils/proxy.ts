type ProxyObject = Record<string, any>;
type Validator = Record<string, Function>;

function createProxyObject<T>(props: ProxyObject = {}, callback: Function, name?: string): T {
  const validator: Validator = {
    get: (target: ProxyObject, prop: keyof ProxyObject): any => {
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return createProxyObject(target[prop], callback, name ? `${name}.${prop}` : prop);
      }

      return target[prop];
    },
    set: (target: ProxyObject, prop: keyof ProxyObject, value: any) => {
      target[prop] = value;
      callback([{ [prop]: target[prop] }, { [prop]: value }, name ? `${name}.${prop}` : name]);
      return true;
    },
    deleteProperty: () => false,
  };

  return new Proxy(props as Object, validator) as T;
}

export { createProxyObject };
