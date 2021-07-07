import { BASE_URLS } from '../../../api';
import { LoginAPI } from './login.api';

const loginApi = new LoginAPI(BASE_URLS.auth);

export class LoginController {
  login = async (data: Record<string, string>) => {
    try {
      const userID = await loginApi.login(data);
      console.log(userID);
    } catch (error) {
      console.error(error);
    }
  };

  autoLogin = async () => {
    try {
      const userID = await loginApi.checkAuth();
      console.log(userID);
    } catch (error) {
      console.error(error);
    }
  };
}
