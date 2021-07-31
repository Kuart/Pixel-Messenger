import { authAPI } from '../api';
import { PixelStore } from '../utils';

export class AuthController {
  checkAuth = async () => {
    try {
      const userData = await authAPI.getUserData();
      PixelStore.setUserData({ ...userData, isAuth: true });
      PixelStore.dispatch('currentUser', { ...userData });
    } catch (error) {
      console.error(error);
    }
  };

  logout = async () => {
    try {
      await authAPI.logout();
      PixelStore.setUserData({ isAuth: false });
      PixelStore.dispatch('currentUser', {});
    } catch (error) {
      console.error(error);
    }
  };
}
