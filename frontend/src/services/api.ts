import axios from 'axios';
import {
  ForecastRequest,
  ForecastResponse,
  DataUpdateResponse,
  ForecastMetrics,
  ForecastStatus,
  ForecastData
} from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadData = async (
  file: File,
  dateCol: string,
  menuCol: string,
  targetCol: string
): Promise<DataUpdateResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('date_col', dateCol);
  formData.append('menu_col', menuCol);
  formData.append('target_col', targetCol);

  const response = await api.post<DataUpdateResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const createForecast = async (
  forecastData: ForecastRequest
): Promise<ForecastResponse> => {
  const response = await api.post<ForecastResponse>('/forecast', forecastData);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get<{ status: string }>('/health');
  return response.data;
};

export const forecastingAPI = {
  // Get forecast results
  getResults: async (): Promise<ForecastResponse> => {
    const response = await api.get<ForecastResponse>('/results');
    return response.data;
  },

  // Get forecast status
  getStatus: async (): Promise<ForecastStatus> => {
    const response = await api.get<ForecastStatus>('/status');
    return response.data;
  },

  // Get model metrics
  getMetrics: async (): Promise<ForecastMetrics> => {
    const response = await api.get<ForecastMetrics>('/metrics');
    return response.data;
  }
};

export default api; 