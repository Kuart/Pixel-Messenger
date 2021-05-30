import { nodeSearchError } from '../const/errors';
import { PixelParser } from './pixelParser';
import { PixelRouter } from './pixelRouter';

export class PixelDOM {
  constructor(routes) {
    this.parser = new PixelParser(this);
    this.router = new PixelRouter(this, routes);
    this.domParser = new DOMParser();
  }

  rootNode = null;
  rootComponent = null;
  components = {};
  _components = {};
  listeners = [];
  activeListeners = [];

  init(root, target) {
    this.root = root;
    this.rootNode = target;
    const startPage = this.router.initRouting();

    this.registerComponent(root, { page: startPage });
    this.render(`{{@ ${root.name} @}}`, { page: startPage }, target);
  }

  render(template, context, target) {
    const html = this.parser.parseHTML(template, context);
    const nodes = this.domParser.parseFromString(html, 'text/html');

    if (target && nodes && nodes.body && nodes.body.firstChild) {
      if (nodes.body.firstChild.nodeType === 1) {
        if (!target.firstChild) {
          target.appendChild(nodes.body.firstChild);
        } else {
          target.replaceChild(nodes.body.firstChild, target.firstChild);
        }
      } else if (nodes.body.firstChild.nodeType === 3) {
        target.textContent = nodes.body.firstChild.textContent;
      }
    }

    this.startListen();
  }

  registerComponent(component, context) {
    if (!this.components[component.name]) {
      this.components[component.name] = component(context);
      this._components[component.name] = component;
    }
  }

  registerListener(listenerType, selector, handler) {
    this.listeners.push({ listenerType, selector, handler });
  }

  startListen() {
    try {
      this.listeners.forEach((listener) => {
        const { listenerType, selector, handler } = listener;
        const node = document.querySelector(`.${selector}`);
        console.log(selector);
        if (!node) throw Error(nodeSearchError(selector));

        node.addEventListener(listenerType, handler);
        this.activeListeners.push(listener);
      });
    } catch (error) {
      console.error(error);
    }
  }

  stopListen() {
    this.activeListeners.forEach((listener) => {
      const { listenerType, node, handler } = listener;
      node.removeEventListener(listenerType, handler);
    });

    this.activeListeners = [];
  }

  changePage(page) {
    this.listeners = [];
    this.components[this.root.name] = this._components[this.root.name]({ page });
    this.render(`{{@ ${this.root.name} @}}`, { page }, this.rootNode);
  }
}
