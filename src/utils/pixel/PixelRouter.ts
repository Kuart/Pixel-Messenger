import { Pixel } from './Pixel';

class PixelRouter {
  public pixel: Pixel;

  public routes: Record<string, string>;

  constructor(pixel: Pixel, routes: Record<string, string>) {
    this.pixel = pixel;
    this.routes = routes;
  }

  initRouting() {
    window.onhashchange = this.callUpdate.bind(this);

    if (!window.location.hash) {
      /* window.location.hash = routs.outs.login; */
    } else if (!this.routes[window.location.hash]) {
      /* window.location.hash = routes.wrongRout; */
    }
    return this.routes[window.location.hash];
  }

  callUpdate(event: HashChangeEvent) {
    const target = event.currentTarget as Window;
    const component = this.routes[target.location.hash];
    if (!component) {
      /* window.location.hash = routs.wrongRout; */
      /*  this.pixelDOM.changePage(routs.wrongRout); */
    } else {
      /*     this.pixelDOM.changePage(this.routes[event.currentTarget.location.hash]); */
    }
  }
}

export { PixelRouter };
