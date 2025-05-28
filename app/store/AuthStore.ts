import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Credentials } from '@/app/models/Credentials';

interface AuthState {
  credentials: Credentials;
  storeCredentials: (username: string, password: string) => void;
  getCredentials: () => Credentials;
  clearCredentials: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      credentials: { username: '', password: '' },

      storeCredentials: (username: string, password: string) => {
        set({ credentials: { username, password } });
      },

      getCredentials: () => {
        return get().credentials;
      },

      clearCredentials: () => {
        set({ credentials: { username: '', password: '' } });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ credentials: state.credentials}),
    }
  )
);

export default useAuthStore;