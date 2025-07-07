import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, MessageCircle, Play, ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '../types/routes';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Sales Forecasting',
      description: 'AI-powered sales predictions and analytics',
      color: 'text-green-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Marketing Insights',
      description: 'Multi-platform marketing optimization',
      color: 'text-blue-600'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'AI Assistant',
      description: 'Interactive business intelligence chat',
      color: 'text-purple-600'
    }
  ];

  const platforms = [
    { name: 'Google Ads', icon: '🔍', color: 'bg-red-100 text-red-600' },
    { name: 'Meta Ads', icon: '📘', color: 'bg-blue-100 text-blue-600' },
    { name: 'TikTok Ads', icon: '🎬', color: 'bg-pink-100 text-pink-600' },
    { name: 'Yelp Ads', icon: '📍', color: 'bg-red-100 text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">KIVO AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-100 text-sm">Professional Analytics</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Intelligent Business
            <span className="block text-yellow-300">Forecasting Platform</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Transform your business data into actionable insights with AI-powered analytics, 
            multi-platform marketing optimization, and intelligent forecasting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleLaunchApp}
              disabled={isLoading}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Launch Dashboard</span>
                </>
              )}
            </button>
            
            <Link
              to={ROUTES.WORKFLOW_DEMO}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>View Demo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-8 text-center backdrop-blur-sm">
              <div className={`${feature.color} mb-4 flex justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Integration */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Multi-Platform Integration
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl mb-3">{platform.icon}</div>
              <h3 className="font-semibold text-gray-900">{platform.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">94%</div>
            <div className="text-blue-100">Prediction Accuracy</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">4</div>
            <div className="text-blue-100">Platforms Supported</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">AI</div>
            <div className="text-blue-100">Powered Analytics</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Real-time Insights</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white bg-opacity-10 rounded-lg p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven business intelligence with our comprehensive 
            analytics platform. Get started with your free demo today.
          </p>
          <button
            onClick={handleLaunchApp}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Demo
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center text-blue-100">
          <p>&copy; 2025 KIVO AI. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <a
              href="/kivo/verification/privacy.html"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="/kivo/verification/terms.html"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <a
              href="/kivo/verification/callback.html"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              OAuth Callback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 