import { PROP_STORAGES, ERRORS } from './const';
import { Props, State } from '../pixelDom';
import { IPropStorages } from './parser.type';

const parseObjectPathTag = (store: Props | State, path: string): unknown => {
  try {
    const keys = path.split('.');
    let result = store;

    for (const key of keys) {
      const value = result[key];

      if (value === undefined) {
        throw Error();
      }

      result = value as Props;
    }

    return result;
  } catch (error) {
    throw Error(ERRORS.missedBindProperty(path));
  }
};

const slicePropStorage = (value: string): [keyof IPropStorages, string] => {
  const [store, ...path] = value.split('.');

  if (!PROP_STORAGES[store]) {
    throw Error(ERRORS.missedBindStore);
  }

  return [PROP_STORAGES[store], path.join('.')];
};

const bindProps = <T>(props: Props, name: string, store: T, path: string) => {
  props[name] = parseObjectPathTag(store, path);
};

export { parseObjectPathTag, slicePropStorage, bindProps };
