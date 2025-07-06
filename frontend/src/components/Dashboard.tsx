import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Target, MessageCircle, Play, ArrowRight, Users, DollarSign, ShoppingCart, Sparkles, Zap, Star } from 'lucide-react';
import { ROUTES } from '../types/routes';

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      title: 'Workflow Demo',
      description: 'See the complete end-to-end workflow',
      icon: <Play className="w-6 h-6" />,
      path: ROUTES.WORKFLOW_DEMO,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      textColor: 'text-white',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Sales Predictions',
      description: 'AI-powered sales forecasting',
      icon: <TrendingUp className="w-6 h-6" />,
      path: ROUTES.SALES_PREDICTIONS,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      textColor: 'text-white',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Marketing Insights',
      description: 'Multi-platform marketing analysis',
      icon: <Target className="w-6 h-6" />,
      path: ROUTES.MARKETING_PREDICTIONS,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      textColor: 'text-white',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'AI Chat Assistant',
      description: 'Interactive business insights',
      icon: <MessageCircle className="w-6 h-6" />,
      path: ROUTES.CHAT_SYSTEM,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      textColor: 'text-white',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'Total Sales', value: '$285,000', change: '+15%', icon: <DollarSign className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Active Users', value: '1,247', change: '+8%', icon: <Users className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Orders', value: '8,934', change: '+12%', icon: <ShoppingCart className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Predictions', value: '94.2%', change: '+2.1%', icon: <BarChart3 className="w-5 h-5" />, color: 'text-orange-600' }
  ];

  const features = [
    {
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms for accurate predictions',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Multi-Platform Integration',
      description: 'Seamless connection with Google, Meta, TikTok, and Yelp',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      title: 'Real-Time Insights',
      description: 'Live data updates and instant business recommendations',
      icon: <Star className="w-5 h-5" />,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h1 className="text-4xl font-bold">Welcome to KIVO AI</h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">
              Your intelligent business forecasting platform powered by advanced AI
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Live Analytics</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">AI Predictions</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-blue-100">Platforms</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">AI</div>
                <div className="text-sm text-blue-100">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} bg-opacity-10 p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Demo Prominent Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Play className="w-8 h-8 text-yellow-300" />
                <h2 className="text-3xl font-bold">Experience the Complete Workflow</h2>
              </div>
              <p className="text-indigo-100 mb-6 text-lg">
                See how KIVO AI transforms your business data into actionable insights. 
                From sales data upload to AI-powered predictions and marketing optimization.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to={ROUTES.WORKFLOW_DEMO}
                  className="flex items-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Demo</span>
                </Link>
                <div className="flex items-center space-x-2 text-indigo-100">
                  <span>Auto-play available</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm text-indigo-100">Workflow Steps</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">AI</div>
                  <div className="text-sm text-indigo-100">Powered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`${action.color} ${action.textColor} rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                {action.icon}
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`${feature.color} mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 