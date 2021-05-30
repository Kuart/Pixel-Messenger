import { routs } from '../const';

export class PixelRouter {
  constructor(pixelDOM, routes) {
    this.pixelDOM = pixelDOM;
    this.routes = routes;
  }

  initRouting() {
    window.onhashchange = this.callUpdate.bind(this);

    if (!location.hash) {
      location.hash = routs.login;
    }

    return this.routes[location.hash];
  }

  callUpdate(event) {
    this.pixelDOM.changePage(this.routes[event.currentTarget.location.hash]);
  }
}
