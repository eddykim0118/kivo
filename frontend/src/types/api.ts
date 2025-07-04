export interface ForecastRequest {
  data: Array<Record<string, any>>;
  model_type: string;
  forecast_horizon: number;
  feature_groups: string[];
  target_col: string;
  date_col: string;
  menu_col: string;
}

export interface ForecastData {
  date: string;
  actual: number;
  predicted: number;
  menu: string;
}

export interface ModelConfig {
  model_type: 'prophet' | 'arima' | 'lstm';
  forecast_horizon: number;
  seasonality: boolean;
  holidays: boolean;
  changepoint_prior_scale: number;
  seasonality_prior_scale: number;
  holidays_prior_scale: number;
}

export interface ForecastResponse {
  forecast_data: ForecastData[];
  metrics: ForecastMetrics;
}

export interface DataUpdateResponse {
  status: string;
  message: string;
  new_records: number;
  total_records: number;
}

export interface ForecastMetrics {
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
}

export interface ForecastStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
} 