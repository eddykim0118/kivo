import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ForecastData, ForecastMetrics } from '../types/api';
import { LineChart, BarChart2, TrendingUp, Download } from 'lucide-react';

interface ResultsProps {
  modelMetrics: ForecastMetrics;
  forecastData: ForecastData[];
}

const Results: React.FC<ResultsProps> = ({ modelMetrics, forecastData }) => {
  const handleExport = () => {
    const csvContent = [
      ['Date', 'Actual', 'Predicted', 'Menu'],
      ...forecastData.map(data => [
        data.date,
        data.actual.toString(),
        data.predicted.toString(),
        data.menu,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'forecast_results.csv';
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Forecast Results</h2>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Results
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mean Absolute Error</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {modelMetrics.mae.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <LineChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Root Mean Square Error</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {modelMetrics.rmse.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">R-squared Score</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {modelMetrics.r2.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Forecast Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Menu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Predicted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forecastData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.menu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.actual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.predicted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results; 