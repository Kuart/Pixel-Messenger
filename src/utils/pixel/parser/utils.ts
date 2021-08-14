import { PROP_STORAGES, ERRORS } from './const';
import { Props, State } from '../pixelDom';
import { IData, ISliceStoreWithAlt, ISliceStore, IPropStorages } from './parser.type';

const parseObjectPathTag = (store: Props | State, path: string, alt?: string): unknown => {
  try {
    const keys = path.split('.');
    let result = store;

    for (const key of keys) {
      const value = result[key];

      if (value === undefined || value === null) {
        if (alt) {
          return alt;
        }
        /* console.warn(ERRORS.missedBindProperty(path)); */
        return '';
      }

      result = value as Props;
    }
    return result;
  } catch (error) {
    throw Error(ERRORS.missedBindProperty(path));
  }
};

const slicePropStorage = (value: string): ISliceStore | ISliceStoreWithAlt => {
  const altSplit = value.split('||');
  const isAlt = altSplit.length > 1;

  /* alternative value if main prop is undefined */
  if (isAlt) {
    const [store, ...path] = altSplit[0].trim().split('.');
    let altStore = '';
    let altPath = '';

    if (altSplit[1].trim() !== "''") {
      const [aStore, ...aPath] = altSplit[1].trim().split('.');
      altStore = PROP_STORAGES[aStore] ? PROP_STORAGES[aStore] : aStore;
      altPath = aPath.join('.');
    }

    if (!PROP_STORAGES[store]) {
      throw Error(ERRORS.missedBindStore(value));
    }

    return [PROP_STORAGES[store], path.join('.'), altStore, altPath];
  }

  const [store, ...path] = value.split('.');

  if (!PROP_STORAGES[store]) {
    throw Error(ERRORS.missedBindStore(value));
  }

  return [PROP_STORAGES[store], path.join('.')];
};

const bindProps = <T>(props: Props, name: string, store: T, path: string) => {
  props[name] = parseObjectPathTag(store, path);
};

const takePropInStore = (value: string, data: IData, predefinedStore?: State | Props) => {
  if (predefinedStore) {
    return parseObjectPathTag(predefinedStore, value);
  }
  const [store, path, aStore, aPath] = slicePropStorage(value);

  const altStore = PROP_STORAGES[aStore!];
  const altValue = aPath && altStore ? parseObjectPathTag(data[aStore as keyof IPropStorages], aPath) : aStore;

  if (altValue !== undefined) {
    return parseObjectPathTag(data[store], path, altValue as string);
  }

  return parseObjectPathTag(data[store], path);
};

export { parseObjectPathTag, slicePropStorage, bindProps, takePropInStore };
