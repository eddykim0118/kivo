import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle, Clock, TrendingUp, MessageCircle, BarChart3 } from 'lucide-react';
import DataUpload from './DataUpload';
import SalesPredictions from './SalesPredictions';
import MarketingPredictions from './MarketingPredictions';
import ChatSystem from './ChatSystem';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  duration: number;
}

const WorkflowDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'data-upload',
      title: 'Sales Data Upload',
      description: 'Upload and process client sales data',
      component: <DataUpload onDataUpload={(data) => console.log('Data uploaded:', data)} />,
      status: 'active',
      duration: 3000
    },
    {
      id: 'sales-predictions',
      title: 'Sales Predictions',
      description: 'AI-powered sales forecasting and analysis',
      component: <SalesPredictions />,
      status: 'pending',
      duration: 4000
    },
    {
      id: 'marketing-predictions',
      title: 'Marketing Predictions',
      description: 'Multi-platform marketing insights (Google, Meta, TikTok, Yelp)',
      component: <MarketingPredictions />,
      status: 'pending',
      duration: 3500
    },
    {
      id: 'chat-system',
      title: 'AI Chat Assistant',
      description: 'Interactive communication with AI business assistant',
      component: <ChatSystem />,
      status: 'pending',
      duration: 3000
    }
  ];

  const handleStepComplete = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setAutoPlay(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setAutoPlay(true);
    // Auto-advance through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < workflowSteps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          setAutoPlay(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 4000);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setAutoPlay(false);
  };

  const handleNext = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAutoPlay(false);
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Demo</h1>
              <p className="text-gray-600">End-to-end business intelligence workflow</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Play Demo</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}
              
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentStep === workflowSteps.length - 1}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <span>Next</span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${getStepStatus(index) === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : getStepStatus(index) === 'active'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-200 border-gray-300 text-gray-500'
                    }
                  `}>
                    {getStepStatus(index) === 'completed' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-all duration-300
                    ${getStepStatus(index) === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {workflowSteps[currentStep].title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {workflowSteps[currentStep].description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {autoPlay && (
                  <div className="flex items-center space-x-1 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span>Auto-playing</span>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {workflowSteps.length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {workflowSteps[currentStep].component}
          </div>
        </div>

        {/* Step Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <span>Previous Step</span>
            </button>
            
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {workflowSteps.length}
            </span>
            
            <button
              onClick={handleNext}
              disabled={currentStep === workflowSteps.length - 1}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <span>Next Step</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {autoPlay ? 'Auto-play enabled' : 'Manual mode'}
            </div>
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Workflow Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Sales Data</span>
              </div>
              <p className="text-sm text-gray-600">Upload and process historical sales data for analysis</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="font-medium">Predictions</span>
              </div>
              <p className="text-sm text-gray-600">AI-powered sales forecasting and trend analysis</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Marketing</span>
              </div>
              <p className="text-sm text-gray-600">Multi-platform marketing insights and ROI analysis</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageCircle className="w-5 h-5 text-orange-600" />
                <span className="font-medium">AI Chat</span>
              </div>
              <p className="text-sm text-gray-600">Interactive AI assistant for business insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDemo; 