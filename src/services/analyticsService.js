import apiClient from './api';
import { mockAPI } from './mockAPI';

// Toggle this to use mock API (true) or real API (false)
const USE_MOCK_API = false;

export const analyticsService = {
  // Get dashboard statistics
  getDashboardStats: async (params) => {
    if (USE_MOCK_API) {
      return await mockAPI.getDashboardStats();
    }
    const response = await apiClient.get('/analytics/dashboard', { params });
    return response.data;
  },

  // Get ticket statistics
  getTicketStats: async (params) => {
    if (USE_MOCK_API) {
      return await mockAPI.getTicketStats();
    }
    const response = await apiClient.get('/analytics/tickets', { params });
    return response.data;
  },

  // Get agent performance
  getAgentPerformance: async (params) => {
    const response = await apiClient.get('/analytics/agents', { params });
    return response.data;
  },

  // Get MTTR (Mean Time To Resolution)
  getMTTR: async (params) => {
    const response = await apiClient.get('/analytics/mttr', { params });
    return response.data;
  },

  // Get ticket trends
  getTicketTrends: async (params) => {
    const response = await apiClient.get('/analytics/trends', { params });
    return response.data;
  },

  // Get category statistics
  getCategoryStats: async (params) => {
    const response = await apiClient.get('/analytics/categories', { params });
    return response.data;
  },

  // Get SLA compliance
  getSLACompliance: async (params) => {
    const response = await apiClient.get('/analytics/sla', { params });
    return response.data;
  },

  // Export analytics report
  exportReport: async (params) => {
    const response = await apiClient.get('/analytics/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
