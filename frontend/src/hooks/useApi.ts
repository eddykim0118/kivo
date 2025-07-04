import { useState, useCallback } from 'react';
import { ForecastRequest, ForecastResponse, DataUpdateResponse } from '../types/api';

interface ApiError {
  message: string;
  status?: number;
}

interface ApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (
    url: string,
    options?: RequestInit
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'An error occurred',
        status: error instanceof Response ? error.status : undefined,
      };
      setState({ data: null, error: apiError, isLoading: false });
      throw apiError;
    }
  }, []);

  const uploadData = useCallback(async (
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

    return execute('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type here, let the browser set it with the boundary
      },
    });
  }, [execute]);

  const createForecast = useCallback(async (
    forecastData: ForecastRequest
  ): Promise<ForecastResponse> => {
    return execute('/api/forecast', {
      method: 'POST',
      body: JSON.stringify(forecastData),
    });
  }, [execute]);

  return {
    ...state,
    execute,
    uploadData,
    createForecast,
  };
} 