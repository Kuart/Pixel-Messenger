import { Methods, Props } from '../utils';

type Attributes = Record<string, string>;

interface IParsedTag {
  tagName: string;
  attrs: Attributes;
  methodsType?: Methods;
  props?: Props;
  type?: string;
}

export { IParsedTag, Attributes };
