type Methods = Record<string, { event: string; handler?: Function }>;
type Attributes = Record<string, string | number | boolean>;

interface IParsedTag {
  tagName: string;
  attrs: Attributes;
  methods: Methods;
  type: string;
}

export { IParsedTag, Methods, Attributes };
