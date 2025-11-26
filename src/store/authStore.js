import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth-storage');
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
      
      // Refresh user data from server
      refreshUser: async () => {
        try {
          const response = await api.get('/auth/me');
          const userData = response.data.user || response.data;
          set((state) => ({
            user: { ...state.user, ...userData },
          }));
          return userData;
        } catch (error) {
          console.error('Failed to refresh user:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
