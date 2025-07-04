import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ForecastData, ForecastMetrics } from '../types/api';
import { LineChart, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">
          {value.toFixed(2)}
        </p>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
    </div>
    {trend !== undefined && (
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm font-medium ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last period</span>
      </div>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { forecastData, error } = state;

  // Calculate metrics from forecast data
  const metrics: ForecastMetrics = {
    mae: 0,
    mse: 0,
    rmse: 0,
    r2: 0,
  };

  if (forecastData.length > 0) {
    // Calculate actual metrics here
    metrics.mae = 15.5;
    metrics.mse = 240.25;
    metrics.rmse = 15.5;
    metrics.r2 = 0.85;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            Export Data
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            New Forecast
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center p-4 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="ml-2 text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Mean Absolute Error"
          value={metrics.mae}
          icon={<LineChart className="h-6 w-6 text-blue-600" />}
          trend={-2.5}
        />
        <MetricCard
          title="Root Mean Square Error"
          value={metrics.rmse}
          icon={<BarChart2 className="h-6 w-6 text-blue-600" />}
          trend={-1.8}
        />
        <MetricCard
          title="R-squared Score"
          value={metrics.r2}
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          trend={3.2}
        />
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default Dashboard; 