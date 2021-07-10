import { BASE_URLS, CookieAuthAPI } from '../api';
import { PixelStore } from '../utils';

const cookieAuthAPI = new CookieAuthAPI(BASE_URLS.auth);

export class CookieAuthController {
  checkAuth = async () => {
    try {
      const userData = await cookieAuthAPI.getUserData();
      PixelStore.setUserData({ ...userData, isAuth: true });
    } catch (error) {
      console.error(error);
    }
  };
}
