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
    } else if (!this.routes[location.hash]) {
      location.hash = routs.wrongRout;
    }

    return this.routes[location.hash];
  }

  callUpdate(event) {
    const component = this.routes[event.currentTarget.location.hash];
    if (!component) {
      location.hash = routs.wrongRout;
      this.pixelDOM.changePage(routs.wrongRout);
    } else {
      this.pixelDOM.changePage(this.routes[event.currentTarget.location.hash]);
    }
  }
}
