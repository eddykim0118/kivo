import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  MessageCircle, 
  Upload, 
  BarChart3, 
  Play,
  Sparkles,
  Home,
  Settings,
  HelpCircle
} from 'lucide-react';
import { ROUTES } from '../types/routes';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="w-5 h-5" />,
      description: 'Overview and analytics'
    },
    {
      name: 'Data Upload',
      path: '/upload',
      icon: <Upload className="w-5 h-5" />,
      description: 'Upload CSV/Excel files'
    },
    {
      name: 'Sales Predictions',
      path: '/sales',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'AI-powered forecasting'
    },
    {
      name: 'Marketing Insights',
      path: '/marketing',
      icon: <Target className="w-5 h-5" />,
      description: 'Multi-platform analytics'
    },
    {
      name: 'AI Chat',
      path: '/chat',
      icon: <MessageCircle className="w-5 h-5" />,
      description: 'Interactive assistant'
    },
    {
      name: 'Workflow Demo',
      path: '/demo',
      icon: <Play className="w-5 h-5" />,
      description: 'Complete demo'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">KIVO AI</h1>
              <p className="text-sm text-gray-500">Business Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Link
              to="/help"
              className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Help & Support</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm">Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 