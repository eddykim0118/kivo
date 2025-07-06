import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROUTES } from './types/routes';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataUpload from './components/DataUpload';
import ModelConfig from './components/ModelConfig';
import Results from './components/Results';
import MenuPredictions from './components/MenuPredictions';
import WorkflowDemo from './components/WorkflowDemo';
import SalesPredictions from './components/SalesPredictions';
import MarketingPredictions from './components/MarketingPredictions';
import ChatSystem from './components/ChatSystem';

const ProtectedAppContent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isRunning, setIsRunning] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route
            path={ROUTES.UPLOAD}
            element={
              <DataUpload
                onDataUpload={(data) => {
                  console.log('Data uploaded:', data);
                }}
              />
            }
          />
          <Route
            path={ROUTES.MODEL_CONFIG}
            element={
              <ModelConfig
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                setModelMetrics={(metrics) => {
                  dispatch({ type: 'SET_MODEL_METRICS', payload: metrics });
                }}
              />
            }
          />
          <Route
            path={ROUTES.RESULTS}
            element={
              <Results
                modelMetrics={state.modelMetrics}
                forecastData={state.forecastData}
              />
            }
          />
          <Route path={ROUTES.MENU_PREDICTIONS} element={<MenuPredictions />} />
          <Route path={ROUTES.WORKFLOW_DEMO} element={<WorkflowDemo />} />
          <Route path={ROUTES.SALES_PREDICTIONS} element={<SalesPredictions />} />
          <Route path={ROUTES.MARKETING_PREDICTIONS} element={<MarketingPredictions />} />
          <Route path={ROUTES.CHAT_SYSTEM} element={<ChatSystem />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AuthGate>
          <ProtectedAppContent />
        </AuthGate>
      </AppProvider>
    </AuthProvider>
  );
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  return <>{children}</>;
}

export default App; 