import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar, Target, AlertCircle } from 'lucide-react';

interface SalesData {
  date: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface ProductPerformance {
  name: string;
  sales: number;
  growth: number;
  category: string;
}

interface SalesPredictionsProps {
  onPredictionUpdate?: (data: any) => void;
}

const SalesPredictions: React.FC<SalesPredictionsProps> = ({ onPredictionUpdate }) => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [productData, setProductData] = useState<ProductPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'30d' | '90d' | '1y'>('90d');

  // Mock sales data
  const mockSalesData: SalesData[] = [
    { date: '2024-01', actual: 12500, predicted: 12000, confidence: 0.85 },
    { date: '2024-02', actual: 13800, predicted: 13500, confidence: 0.88 },
    { date: '2024-03', actual: 15200, predicted: 15000, confidence: 0.90 },
    { date: '2024-04', actual: 16800, predicted: 16500, confidence: 0.92 },
    { date: '2024-05', actual: 18200, predicted: 18000, confidence: 0.89 },
    { date: '2024-06', actual: 19500, predicted: 19500, confidence: 0.91 },
    { date: '2024-07', actual: 21000, predicted: 21000, confidence: 0.93 },
    { date: '2024-08', actual: 22500, predicted: 22500, confidence: 0.94 },
    { date: '2024-09', actual: 24000, predicted: 24000, confidence: 0.92 },
    { date: '2024-10', actual: 25500, predicted: 25500, confidence: 0.90 },
    { date: '2024-11', actual: 27000, predicted: 27000, confidence: 0.88 },
    { date: '2024-12', actual: 28500, predicted: 28500, confidence: 0.85 }
  ];

  const mockProductData: ProductPerformance[] = [
    { name: 'Premium Burger', sales: 8500, growth: 12.5, category: 'Food' },
    { name: 'Signature Pizza', sales: 7200, growth: 8.3, category: 'Food' },
    { name: 'Craft Beer', sales: 4800, growth: 15.2, category: 'Beverage' },
    { name: 'Dessert Special', sales: 3200, growth: 6.8, category: 'Dessert' },
    { name: 'Side Dishes', sales: 2800, growth: 4.2, category: 'Food' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSalesData(mockSalesData);
      setProductData(mockProductData);
      setLoading(false);
    }, 1500);
  }, []);

  const getGrowthColor = (growth: number) => {
    if (growth >= 10) return 'text-green-600';
    if (growth >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const pieData = productData.map(product => ({
    name: product.name,
    value: product.sales
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalSales = salesData.reduce((sum, data) => sum + data.actual, 0);
  const predictedSales = salesData.reduce((sum, data) => sum + data.predicted, 0);
  const growthRate = ((predictedSales - totalSales) / totalSales * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Predictions</h1>
            <p className="text-gray-600 mt-1">AI-powered sales forecasting and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">+{growthRate}% Growth</span>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '30d' | '90d' | '1y')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{growthRate}% from last period
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Predicted Sales</p>
              <p className="text-2xl font-bold text-gray-900">${predictedSales.toLocaleString()}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm text-blue-600">
            <Calendar className="w-4 h-4 mr-1" />
            Next 12 months
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-gray-900">
                {(salesData.reduce((sum, data) => sum + data.confidence, 0) / salesData.length * 100).toFixed(1)}%
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Prediction accuracy
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Product</p>
              <p className="text-lg font-bold text-gray-900">Premium Burger</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5% growth
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Trend & Predictions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Actual Sales" />
              <Area type="monotone" dataKey="predicted" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Predicted Sales" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Product Growth Analysis</h3>
          <div className="space-y-4">
            {productData.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.sales.toLocaleString()}</p>
                  <div className={`flex items-center text-sm ${getGrowthColor(product.growth)}`}>
                    {getGrowthIcon(product.growth)}
                    <span className="ml-1">{product.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          AI Sales Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📈 Growth Opportunities</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Premium Burger shows strongest growth potential</li>
              <li>• Craft Beer category expanding rapidly</li>
              <li>• Weekend sales 40% higher than weekdays</li>
              <li>• Seasonal menu items drive 25% revenue increase</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Recommendations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Increase Premium Burger inventory by 20%</li>
              <li>• Launch new craft beer varieties</li>
              <li>• Optimize weekend staffing levels</li>
              <li>• Expand seasonal menu offerings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPredictions; 