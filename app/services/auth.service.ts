import useAuthStore from '@/app/store/AuthStore';
import { Credentials } from '@/app/models/Credentials';
import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';

const isAuthenticated = () => {
  const  credentials = useAuthStore.getState().getCredentials();
  return !!(credentials.username && credentials.password);
}

const getCredentials = () => {
  const credentials = useAuthStore.getState().getCredentials();
  if (!credentials.username || !credentials.password) {
    console.warn('No credentials found in the store');
    return null;
  }
  return credentials;
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
    window.location.href = '/';
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
    window.location.href = '/';
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
  getCredentials,
}