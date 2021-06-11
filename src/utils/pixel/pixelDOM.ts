export interface PNode {
  type: string;
  tagName: string;
  props: Record<string, string | number | boolean>;
  children: PNode[];
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

  /* !replace any */
  mount = (nodeEl: PNode): void => {
    /* global window */
    const domEl = window.document.createElement(nodeEl.tagName);

    Object.entries(nodeEl.props).forEach(([key, value]) => {
      domEl.setAttribute(key, String(value));
    });
  };
}

export default PixelDOM;
