import apiClient from './api';
import { mockAPI } from './mockAPI';

// Toggle this to use mock API (true) or real API (false)
const USE_MOCK_API = false;

export const authService = {
  // Standard login
  login: async (credentials) => {
    if (USE_MOCK_API) {
      return await mockAPI.login(credentials);
    }
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // SSO login
  ssoLogin: async (token) => {
    const response = await apiClient.post('/auth/sso', { token });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // Password reset request
  requestPasswordReset: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Password reset
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },
};
