import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import { useForm } from '../hooks/useForm';
import { BarChart3 } from 'lucide-react';
import { ForecastRequest, ForecastMetrics, ModelConfig as ModelConfigType } from '../types/api';

interface ModelConfigProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  setModelMetrics: (metrics: ForecastMetrics) => void;
}

const initialConfig: ModelConfigType = {
  model_type: 'prophet',
  forecast_horizon: 7,
  seasonality: true,
  holidays: true,
  changepoint_prior_scale: 0.05,
  seasonality_prior_scale: 10,
  holidays_prior_scale: 10,
};

const validationRules = {
  model_type: [
    {
      validate: (value: string) => ['prophet', 'arima', 'lstm'].includes(value),
      message: 'Invalid model type',
    },
  ],
  forecast_horizon: [
    {
      validate: (value: number) => value > 0 && value <= 30,
      message: 'Forecast horizon must be between 1 and 30 days',
    },
  ],
};

const ModelConfig: React.FC<ModelConfigProps> = ({
  isRunning,
  setIsRunning,
  setModelMetrics,
}) => {
  const { dispatch } = useAppContext();
  const { createForecast } = useApi();

  const {
    values: config,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<ModelConfigType>({
    initialValues: initialConfig,
    validationRules,
    onSubmit: async (values) => {
      setIsRunning(true);
      try {
        // Convert ModelConfig to ForecastRequest
        const forecastRequest: ForecastRequest = {
          data: [], // This should come from context or props
          feature_groups: [],
          target_col: 'sales', // These should come from context or props
          date_col: 'date',
          menu_col: 'menu',
          model_type: values.model_type,
          forecast_horizon: values.forecast_horizon,
        };

        const response = await createForecast(forecastRequest);
        setModelMetrics(response.metrics);
        dispatch({ type: 'SET_FORECAST_DATA', payload: response.forecast_data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      } finally {
        setIsRunning(false);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Model Configuration</h2>
        <BarChart3 className="h-6 w-6 text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Type
            </label>
            <select
              name="model_type"
              value={config.model_type}
              onChange={(e) => handleChange('model_type', e.target.value as 'prophet' | 'arima' | 'lstm')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="prophet">Prophet</option>
              <option value="arima">ARIMA</option>
              <option value="lstm">LSTM</option>
            </select>
            {errors.model_type && (
              <p className="mt-1 text-sm text-red-600">{errors.model_type}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Forecast Horizon (days)
            </label>
            <input
              type="number"
              name="forecast_horizon"
              value={config.forecast_horizon}
              onChange={(e) => handleChange('forecast_horizon', parseInt(e.target.value))}
              min="1"
              max="30"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.forecast_horizon && (
              <p className="mt-1 text-sm text-red-600">{errors.forecast_horizon}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seasonality
            </label>
            <input
              type="checkbox"
              name="seasonality"
              checked={config.seasonality}
              onChange={(e) => handleChange('seasonality', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Holidays
            </label>
            <input
              type="checkbox"
              name="holidays"
              checked={config.holidays}
              onChange={(e) => handleChange('holidays', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Changepoint Prior Scale
            </label>
            <input
              type="number"
              name="changepoint_prior_scale"
              value={config.changepoint_prior_scale}
              onChange={(e) => handleChange('changepoint_prior_scale', parseFloat(e.target.value))}
              step="0.01"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seasonality Prior Scale
            </label>
            <input
              type="number"
              name="seasonality_prior_scale"
              value={config.seasonality_prior_scale}
              onChange={(e) => handleChange('seasonality_prior_scale', parseFloat(e.target.value))}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Holidays Prior Scale
            </label>
            <input
              type="number"
              name="holidays_prior_scale"
              value={config.holidays_prior_scale}
              onChange={(e) => handleChange('holidays_prior_scale', parseFloat(e.target.value))}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isRunning}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Running...' : 'Run Forecast'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelConfig; 