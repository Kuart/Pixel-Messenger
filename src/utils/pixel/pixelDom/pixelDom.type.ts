/* eslint no-use-before-define: 0 */

import { Attributes } from '../parser';
import { Component } from '../utils';

interface VNode {
  type: string;
  tagName: string;
  attrs: Attributes;
  children: (VTextNode | VNode | Component)[];
  keyIndex?: number;
  domEl?: HTMLElement | null;
  parent?: VNode | null;
}

interface VTextNode {
  type: string;
  text: string;
  domEl?: Text | null;
  keyIndex?: number;
  parent?: VNode | Component | null;
}

export { VNode, VTextNode };
