import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Settings, BarChart2, LineChart } from 'lucide-react';
import { ROUTES } from '../types/routes';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { path: ROUTES.UPLOAD, label: 'Upload Data', icon: <Upload className="w-5 h-5" /> },
  { path: ROUTES.MODEL_CONFIG, label: 'Model Config', icon: <Settings className="w-5 h-5" /> },
  { path: ROUTES.RESULTS, label: 'Results', icon: <BarChart2 className="w-5 h-5" /> },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LineChart className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              KIVO AI
            </span>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 