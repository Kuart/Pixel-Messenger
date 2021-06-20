/* eslint no-use-before-define: 0 */

import { Attributes } from '../parser';
import { Component, Methods, Props } from '../utils';

interface VElement {
  type: string;
  tagName: string;
  attrs: Attributes;
  children: (VTextNode | VElement | Component)[];
  keyIndex?: number;
  domEl?: HTMLElement;
  parent?: VElement | Component | null;
  propHandlers?: Methods | undefined;
  usedProps?: string[];
  props?: Props;
}

interface VTextNode {
  type: string;
  text: string;
  domEl?: Text;
  props?: Props;
  usedProps?: string[];
  keyIndex?: number;
  parent?: VElement | Component | null;
}

type VirtualNode = VElement | VTextNode | Component;

export { VElement, VTextNode, VirtualNode };
