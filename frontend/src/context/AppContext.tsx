import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ForecastData, ForecastMetrics } from '../types/api';

interface AppState {
  forecastData: ForecastData[];
  isLoading: boolean;
  error: string | null;
  currentModel: string;
  forecastHorizon: number;
  activeTab: string;
  modelMetrics: ForecastMetrics;
}

type AppAction =
  | { type: 'SET_FORECAST_DATA'; payload: ForecastData[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_MODEL'; payload: string }
  | { type: 'SET_FORECAST_HORIZON'; payload: number }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_MODEL_METRICS'; payload: ForecastMetrics };

const initialState: AppState = {
  forecastData: [],
  isLoading: false,
  error: null,
  currentModel: 'prophet',
  forecastHorizon: 30,
  activeTab: 'dashboard',
  modelMetrics: {
    mae: 0,
    mse: 0,
    rmse: 0,
    r2: 0,
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_FORECAST_DATA':
      return { ...state, forecastData: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CURRENT_MODEL':
      return { ...state, currentModel: action.payload };
    case 'SET_FORECAST_HORIZON':
      return { ...state, forecastHorizon: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_MODEL_METRICS':
      return { ...state, modelMetrics: action.payload };
    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 