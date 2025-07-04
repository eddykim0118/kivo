import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Settings, BarChart2, LineChart, Utensils } from 'lucide-react';
import { ROUTES } from '../types/routes';

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { path: ROUTES.UPLOAD, label: 'Upload Data', icon: <Upload className="w-5 h-5" /> },
  { path: ROUTES.MODEL_CONFIG, label: 'Model Config', icon: <Settings className="w-5 h-5" /> },
  { path: ROUTES.RESULTS, label: 'Results', icon: <BarChart2 className="w-5 h-5" /> },
  { path: ROUTES.MENU_PREDICTIONS, label: 'Menu Predictions', icon: <Utensils className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <LineChart className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">
            KIVO AI
          </span>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 