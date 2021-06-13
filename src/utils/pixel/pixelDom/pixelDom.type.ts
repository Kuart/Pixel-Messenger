/* eslint no-use-before-define: 0 */

interface VNode {
  type: string;
  tagName: string;
  props: Record<string, string | number | boolean>;
  children: (VTextNode | VNode)[];
  keyIndex?: number;
  domEl?: HTMLElement | null;
  parent?: VNode | null;
}

interface VTextNode {
  type: string;
  text: string;
  domEl?: Text | null;
  keyIndex?: number;
  parent?: VNode | null;
}

export { VNode, VTextNode };
