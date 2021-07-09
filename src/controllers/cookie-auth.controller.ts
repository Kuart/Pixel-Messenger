import { BASE_URLS, CookieAuthAPI } from '../api';

const cookieAuthAPI = new CookieAuthAPI(BASE_URLS.auth);

export class CookieAuthController {
  checkAuth = async () => {
    try {
      await cookieAuthAPI.checkAuth();
    } catch (error) {
      console.error(error);
    }
  };
}
