/* eslint no-use-before-define: 0 */

import { Attributes } from '../parser';
import { Component, Methods } from '../utils';

interface VElement {
  type: string;
  tagName: string;
  attrs: Attributes;
  children: (VTextNode | VElement | Component)[];
  keyIndex?: number;
  domEl?: HTMLElement;
  parent?: VElement | Component | null;
  propHandlers?: Methods | undefined;
}

interface VTextNode {
  type: string;
  text: string;
  domEl?: Text;
  keyIndex?: number;
  parent?: VElement | Component | null;
}

type VirtualNode = VElement | VTextNode | Component;

export { VElement, VTextNode, VirtualNode };
