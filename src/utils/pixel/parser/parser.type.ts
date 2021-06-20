import { Methods, Props } from '../utils';

type Attributes = Record<string, string>;

interface IParsedTag {
  tagName: string;
  attrs: Attributes;
  propHandlers?: Methods;
  props?: Props;
  usedPropsList?: string[];
  type?: string;
}

export { IParsedTag, Attributes };
