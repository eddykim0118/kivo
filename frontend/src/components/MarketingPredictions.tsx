import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, BarChart3, Facebook, Youtube, MapPin, Play } from 'lucide-react';

interface MarketingData {
  platform: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  predictedRevenue: number;
  engagement?: number;
  reach?: number;
  ctr?: number;
  cpc?: number;
}

interface TikTokMetrics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  followers: number;
  engagementRate: number;
  videoViews: number;
  hashtagPerformance: string[];
}

interface PlatformMetrics {
  google: MarketingData;
  meta: MarketingData;
  tiktok: MarketingData & TikTokMetrics;
  yelp: MarketingData;
}

const MarketingPredictions: React.FC = () => {
  const [marketingData, setMarketingData] = useState<PlatformMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Enhanced mock data with detailed TikTok metrics
  const mockMarketingData: PlatformMetrics = {
    google: {
      platform: 'Google Ads',
      spend: 2500,
      impressions: 45000,
      clicks: 1800,
      conversions: 120,
      roi: 3.2,
      predictedRevenue: 8000,
      engagement: 2.8,
      reach: 45000,
      ctr: 4.0,
      cpc: 1.39
    },
    meta: {
      platform: 'Meta Ads',
      spend: 1800,
      impressions: 65000,
      clicks: 2200,
      conversions: 95,
      roi: 2.8,
      predictedRevenue: 5040,
      engagement: 3.4,
      reach: 65000,
      ctr: 3.4,
      cpc: 0.82
    },
    tiktok: {
      platform: 'TikTok Ads',
      spend: 1200,
      impressions: 85000,
      clicks: 3100,
      conversions: 180,
      roi: 4.1,
      predictedRevenue: 4920,
      engagement: 6.2,
      reach: 85000,
      ctr: 3.6,
      cpc: 0.39,
      // TikTok-specific metrics
      views: 125000,
      likes: 8500,
      shares: 1200,
      comments: 450,
      followers: 3200,
      engagementRate: 8.5,
      videoViews: 125000,
      hashtagPerformance: ['#foodie', '#restaurant', '#delicious', '#viral']
    },
    yelp: {
      platform: 'Yelp Ads',
      spend: 800,
      impressions: 15000,
      clicks: 600,
      conversions: 45,
      roi: 2.5,
      predictedRevenue: 2000,
      engagement: 1.8,
      reach: 15000,
      ctr: 4.0,
      cpc: 1.33
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMarketingData(mockMarketingData);
      setLoading(false);
    }, 1500);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google ads':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'meta ads':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'tiktok ads':
        return <Play className="w-5 h-5 text-pink-500" />;
      case 'yelp ads':
        return <MapPin className="w-5 h-5 text-red-400" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getROIColor = (roi: number) => {
    if (roi >= 4) return 'text-green-600';
    if (roi >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 5) return 'text-green-600';
    if (engagement >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const chartData = marketingData ? Object.values(marketingData).map(data => ({
    name: data.platform,
    spend: data.spend,
    revenue: data.predictedRevenue,
    roi: data.roi,
    conversions: data.conversions,
    engagement: data.engagement || 0,
    ctr: data.ctr || 0
  })) : [];

  const pieData = marketingData ? Object.values(marketingData).map(data => ({
    name: data.platform,
    value: data.spend
  })) : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Marketing Predictions</h1>
            <p className="text-blue-100 mt-1">AI-powered marketing insights across all platforms</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-green-300" />
            <span className="text-sm font-medium text-green-300">Live Predictions</span>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketingData && Object.entries(marketingData).map(([key, data]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              {getPlatformIcon(data.platform)}
              <span className="text-sm font-medium text-gray-500">{data.platform}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Spend</span>
                <span className="font-semibold">${data.spend.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Predicted Revenue</span>
                <span className="font-semibold text-green-600">${data.predictedRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className={`font-semibold ${getROIColor(data.roi)}`}>{data.roi}x</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversions</span>
                <span className="font-semibold">{data.conversions}</span>
              </div>

              {data.engagement && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className={`font-semibold ${getEngagementColor(data.engagement)}`}>{data.engagement}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* TikTok Special Section */}
      {marketingData?.tiktok && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
          <div className="flex items-center space-x-3 mb-4">
            <Play className="w-6 h-6 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-900">TikTok Performance Deep Dive</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{marketingData.tiktok.views.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{marketingData.tiktok.likes.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{marketingData.tiktok.shares.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Shares</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{marketingData.tiktok.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Top Performing Hashtags</h4>
              <div className="space-y-2">
                {marketingData.tiktok.hashtagPerformance.map((hashtag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{hashtag}</span>
                    <span className="text-sm font-medium text-pink-600">
                      {Math.floor(Math.random() * 50 + 20)}% engagement
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Engagement Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="font-semibold text-green-600">{marketingData.tiktok.engagementRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Video Views</span>
                  <span className="font-semibold">{marketingData.tiktok.videoViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="font-semibold">{marketingData.tiktok.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Spend Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue vs Spend by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="spend" fill="#8884d8" name="Spend" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Predicted Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement Rate by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="engagement" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">ROI by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roi" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CTR Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Click-Through Rate by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'CTR']} />
              <Bar dataKey="ctr" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spend Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Marketing Spend Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="50%" height={300}>
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
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          AI Marketing Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Recommended Actions</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Increase TikTok budget by 30% - highest ROI platform</li>
              <li>• Optimize Google Ads for better conversion rates</li>
              <li>• Focus on Meta retargeting campaigns</li>
              <li>• Enhance Yelp presence for local customers</li>
              <li>• Create more TikTok video content (high engagement)</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📊 Performance Summary</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Total spend: ${Object.values(marketingData || {}).reduce((sum, data) => sum + data.spend, 0).toLocaleString()}</li>
              <li>• Predicted revenue: ${Object.values(marketingData || {}).reduce((sum, data) => sum + data.predictedRevenue, 0).toLocaleString()}</li>
              <li>• Average ROI: {(Object.values(marketingData || {}).reduce((sum, data) => sum + data.roi, 0) / 4).toFixed(1)}x</li>
              <li>• Total conversions: {Object.values(marketingData || {}).reduce((sum, data) => sum + data.conversions, 0)}</li>
              <li>• TikTok engagement: {marketingData?.tiktok.engagementRate}% (industry leading)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPredictions; 