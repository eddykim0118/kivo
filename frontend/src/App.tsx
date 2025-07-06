import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DataUpload from './components/DataUpload';
import SalesPredictions from './components/SalesPredictions';
import MarketingPredictions from './components/MarketingPredictions';
import ChatSystem from './components/ChatSystem';
import WorkflowDemo from './components/WorkflowDemo';

function App() {
  const handleDataUpload = (data: any) => {
    console.log('Data uploaded:', data);
    // Handle the uploaded data here
  };

  return (
    <div className="App">
      <Routes>
        {/* Landing Page - Default Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard and Main App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<DataUpload onDataUpload={handleDataUpload} />} />
        <Route path="/sales" element={<SalesPredictions />} />
        <Route path="/marketing" element={<MarketingPredictions />} />
        <Route path="/chat" element={<ChatSystem />} />
        <Route path="/demo" element={<WorkflowDemo />} />
        
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App; 