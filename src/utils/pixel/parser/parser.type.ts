import { Methods, Props } from '../pixelDom';

type Attributes = Record<string, string>;

interface IParsedTag {
  tagName: string;
  attrs: Attributes;
  propHandlers?: Methods;
  props?: Props;
  usedPropsList: Set<string>;
  type?: string;
}

export { IParsedTag, Attributes };
