export interface PNode {
  type: string;
  tagName: string;
  props: Record<string, string | number | boolean>;
  children: (string | PNode)[];
}

class PixelDOM {
  createElement = (type: string, tagName: string, props: Record<string, string | number | boolean>): PNode => ({
    type,
    tagName,
    props: {
      ...props,
    },
    children: [],
  });

  createTextNode = (type: string, tagName: string, props: Record<string, string | number | boolean>): PNode => ({
    type,
    tagName,
    props: {
      ...props,
    },
    children: [],
  });

  mount = (nodeEl: PNode | string, target: Element): void => {
    if (typeof nodeEl !== 'string') {
      const domEl = window.document.createElement(nodeEl.tagName);

      Object.entries(nodeEl.props).forEach(([key, value]) => {
        domEl.setAttribute(key, String(value));
      });

      target.appendChild(domEl);

      nodeEl.children.forEach((child) => {
        this.mount(child, domEl);
      });
    } else {
      target.textContent = nodeEl;
    }
  };
}

export { PixelDOM };
