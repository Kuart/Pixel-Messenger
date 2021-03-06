import { IPropStorages } from './parser.type';

/*    b: - value from parent state/props
      e: - event
*/

export const ERRORS = {
  missedBindStore: (value: string) => `The binding string (${value}) does not refer to valid objects - IPropStorages`,
  missedBindProperty: (prop: string) => `IPropStorages storage does't have "${prop}"`,
};

export const PREFIXES = {
  BIND: 'b:',
  EVENT: 'e:',
  PROPS: 'p:',
  CONDITION: 'if:',
  LIST: 'map:',
};

export const LIST_TYPE = {
  OBJECT_ARRAY: 'array',
};

export const PROP_STORAGES: Record<string, keyof IPropStorages> = {
  state: 'state',
  props: 'props',
  methods: 'methods',
};

/* export const EMOJI: Record<string, string> = {
  rebel: `<img src="${rebel}" width="30" height="30"/>`,
  alian: `<img src="${alien}" width="30" height="30"/>`,
  its_fine: `<img src="${itsFine}" class="sticker"/>`,
}; */
