import useAuthStore from '@/app/store/AuthStore';
import { Credentials } from '@/app/models/Credentials';
import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';

const isAuthenticated = () => {
  const  credentials = useAuthStore.getState().getCredentials();
  return !!(credentials.username && credentials.password);
}

const login = async (credentials: Credentials) => {
  try {
    if (isAuthenticated()) {
      console.log('User is already authenticated');
      return;
    }

    await ApiService.makeApiRequest({
      url: `/api/auth/login`,
      method: HttpMethods.POST,
      body: credentials
    })

    useAuthStore.getState().storeCredentials(credentials.username, credentials.password);
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
}

const signup = async (credentials: Credentials) => {
  try {
    if (isAuthenticated()) {
      console.log('User is already authenticated');
      return;
    }

    await ApiService.makeApiRequest({
      url: `/api/auth/signup`,
      method: HttpMethods.POST,
      body: credentials
    })

    useAuthStore.getState().storeCredentials(credentials.username, credentials.password);
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
}

const logout = async () => {
  useAuthStore.getState().clearCredentials();
}

export const AuthService = {
  isAuthenticated,
  login,
  signup,
  logout,
}