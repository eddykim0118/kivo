import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
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
        
        {/* Main App Routes with Layout */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/upload" element={
          <Layout>
            <DataUpload onDataUpload={handleDataUpload} />
          </Layout>
        } />
        <Route path="/sales" element={
          <Layout>
            <SalesPredictions />
          </Layout>
        } />
        <Route path="/marketing" element={
          <Layout>
            <MarketingPredictions />
          </Layout>
        } />
        <Route path="/chat" element={
          <Layout>
            <ChatSystem />
          </Layout>
        } />
        <Route path="/demo" element={
          <Layout>
            <WorkflowDemo />
          </Layout>
        } />
        
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App; 