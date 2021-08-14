import { authAPI } from '../api';
import { PixelStore } from '../utils';

export class CookieAuthController {
  checkAuth = async () => {
    try {
      const userData = await authAPI.getUserData();
      PixelStore.setUserData({ ...userData, isAuth: true });
      PixelStore.dispatch('currentUser', { ...userData });
    } catch (error) {
      console.error(error);
    }
  };
}
