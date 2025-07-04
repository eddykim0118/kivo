import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Database, Globe, Code, Brain, BarChart3, User, Server, ChevronDown, ChevronUp, Shield, ExternalLink, GitBranch, AlertTriangle, CheckCircle, Clock, Zap, Calendar, TrendingUp, Target, DollarSign, Upload, Download, Layers, FileText, Settings, Play, Lock, Key, Cloud, Cpu, Monitor, Smartphone, Activity, TestTube, Rocket, Bell } from 'lucide-react';

export default function WebAppFlowchart() {
  const [expandedSections, setExpandedSections] = useState({
    userAuth: true,
    frontend: true,
    backend: true,
    storage: true,
    mlIntegration: true,
    monitoring: true,
    security: true,
    testing: true,
    visualization: true,
    deployment: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FlowSection = ({ sectionId, title, icon: Icon, color, bgColor, children, stepNumber, isLast = false }) => (
    <div className="flex flex-col items-center mb-8">
      <div className={`w-full max-w-6xl ${bgColor} border-2 ${color} rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl relative`}>
        {stepNumber && (
          <div className={`absolute -top-4 left-6 w-8 h-8 ${color.replace('border-', 'bg-')} text-white rounded-full flex items-center justify-center font-bold text-sm z-10`}>
            {stepNumber}
          </div>
        )}
        
        <div 
          className={`${color.replace('border-', 'bg-')} text-white p-4 rounded-t-lg cursor-pointer flex items-center justify-between`}
          onClick={() => toggleSection(sectionId)}
        >
          <div className="flex items-center gap-3">
            <Icon size={24} />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          {expandedSections[sectionId] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections[sectionId] && (
          <div className="p-6">
            {children}
          </div>
        )}
      </div>
      
      {!isLast && (
        <div className="flex items-center justify-center py-4">
          <ArrowDown size={32} className="text-blue-500 animate-pulse" />
        </div>
      )}
    </div>
  );

  const ProcessStep = ({ number, title, details, inputs, outputs, tech, type = 'normal', apiEndpoints }) => {
    const bgColors = {
      normal: 'bg-blue-50',
      decision: 'bg-yellow-50',
      parallel: 'bg-purple-50',
      success: 'bg-green-50',
      security: 'bg-red-50'
    };
    
    const borderColors = {
      normal: 'border-blue-200',
      decision: 'border-yellow-200',
      parallel: 'border-purple-200',
      success: 'border-green-200',
      security: 'border-red-200'
    };

    return (
      <div className={`p-4 rounded-lg border ${borderColors[type]} ${bgColors[type]} transition-all hover:shadow-md`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {number}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 mb-3">{details}</p>
            
            {inputs && (
              <div className="mb-3">
                <h5 className="text-xs font-semibold text-gray-700 mb-1">INPUTS:</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  {inputs.map((input, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {input}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {outputs && (
              <div className="mb-3">
                <h5 className="text-xs font-semibold text-gray-700 mb-1">OUTPUTS:</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  {outputs.map((output, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {output}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {apiEndpoints && (
              <div className="mb-3">
                <h5 className="text-xs font-semibold text-gray-700 mb-1">API ENDPOINTS:</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  {apiEndpoints.map((endpoint, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-100 p-1 rounded">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <code className="text-purple-700">{endpoint}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tech && (
              <div className="text-xs font-mono bg-white px-3 py-1 rounded border text-blue-600">
                <strong>TECH:</strong> {tech}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TechCard = ({ name, description, features, color, icon: Icon }) => (
    <div className={`p-4 rounded-lg border-2 ${color} bg-white transition-all hover:shadow-lg`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={20} className={color.replace('border-', 'text-')} />
        <h4 className="font-bold text-lg text-gray-800">{name}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="space-y-1">
        {features.map((feature, idx) => (
          <div key={idx} className="text-xs flex items-center gap-2">
            <CheckCircle size={12} className="text-green-500" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🌐 Web App Architecture Flowchart
          </h1>
          <p className="text-gray-600 text-xl">Complete system architecture for your forecasting web application</p>
          
          <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">🏗️ Architecture Overview</h3>
            <p className="text-sm text-gray-600">
              Full-stack web application with React frontend, FastAPI backend, AWS S3 storage, 
              Supabase database, and seamless ML service integration with comprehensive security.
            </p>
          </div>
        </div>

        <div className="space-y-0">
          {/* Step 1: User Authentication & Input */}
          <FlowSection
            sectionId="userAuth"
            title="User Authentication & Input Layer"
            icon={User}
            color="border-blue-500"
            bgColor="bg-white"
            stepNumber="1"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <ProcessStep
                number="1.1"
                title="User Authentication (Optional)"
                details="Secure user login and session management using Supabase Auth"
                inputs={[
                  "User credentials (email/password)",
                  "OAuth providers (Google, GitHub)",
                  "JWT tokens for session management"
                ]}
                outputs={[
                  "Authenticated user session",
                  "User-specific data access",
                  "Security tokens for API calls",
                  "Row-level security enforcement"
                ]}
                tech="Supabase Auth + JWT + Row-Level Security"
                type="security"
              />
              
              <ProcessStep
                number="1.2"
                title="File Upload & Configuration"
                details="User interface for uploading CSV/Excel files and configuring forecast parameters"
                inputs={[
                  "CSV/Excel files (drag & drop)",
                  "Forecast horizon selection",
                  "Feature group preferences",
                  "Model selection options"
                ]}
                outputs={[
                  "Validated file data",
                  "Configuration object",
                  "File metadata",
                  "Ready for backend processing"
                ]}
                tech="React Dropzone + File Validation + Form Handling"
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3">🔐 Authentication Flow Details</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">Login Options</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Email/Password</li>
                    <li>• Google OAuth</li>
                    <li>• GitHub OAuth</li>
                    <li>• Magic Links</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">Session Management</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• JWT tokens</li>
                    <li>• Refresh tokens</li>
                    <li>• Secure storage</li>
                    <li>• Auto-refresh</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">Access Control</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• User-specific data</li>
                    <li>• Row-level security</li>
                    <li>• API rate limiting</li>
                    <li>• Role-based access</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 2: Frontend Layer */}
          <FlowSection
            sectionId="frontend"
            title="Frontend: React/TypeScript Interface"
            icon={Monitor}
            color="border-green-500"
            bgColor="bg-white"
            stepNumber="2"
          >
            <ProcessStep
              number="2.1"
              title="React Components & State Management"
              details="Interactive user interface with file uploads, configuration forms, and real-time status updates"
              inputs={[
                "User interactions and file uploads",
                "API responses from backend",
                "Real-time job status updates",
                "Configuration form data"
              ]}
              outputs={[
                "Dynamic UI components",
                "API calls to backend",
                "Real-time status displays",
                "Interactive data visualizations"
              ]}
              tech="React 18 + TypeScript + Axios + React Query"
              apiEndpoints={[
                "POST /api/upload - File upload",
                "POST /api/forecast - Start forecast job",
                "GET /api/jobs/{id} - Job status polling",
                "GET /api/results/{id} - Fetch results"
              ]}
            />

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <TechCard
                name="React 18"
                description="Modern React with hooks and concurrent features"
                color="border-green-400"
                icon={Code}
                features={[
                  "Functional components with hooks",
                  "useState for local state",
                  "useEffect for side effects",
                  "Custom hooks for reusability",
                  "Concurrent rendering",
                  "Suspense for loading states"
                ]}
              />
              
              <TechCard
                name="TypeScript"
                description="Type safety and better developer experience"
                color="border-blue-400"
                icon={FileText}
                features={[
                  "Type definitions for all props",
                  "Interface definitions for API",
                  "Generic type parameters",
                  "Enum for constants",
                  "Compile-time error checking",
                  "Better IDE support"
                ]}
              />
              
              <TechCard
                name="Axios + React Query"
                description="HTTP client with caching and synchronization"
                color="border-purple-400"
                icon={Globe}
                features={[
                  "HTTP request interceptors",
                  "Response caching",
                  "Background refetching",
                  "Optimistic updates",
                  "Error retry logic",
                  "Loading state management"
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-3">📱 Frontend Component Structure</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">Core Components</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>FileUpload:</strong> Drag & drop CSV/Excel upload
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>ConfigForm:</strong> Forecast parameters setup
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>JobStatus:</strong> Real-time processing updates
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>ResultsView:</strong> Charts and data display
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">State Management</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>useState:</strong> Component local state
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>React Query:</strong> Server state caching
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Context API:</strong> Global app state
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>useReducer:</strong> Complex state logic
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProcessStep
              number="2.2"
              title="Error Handling & User Experience"
              details="Comprehensive error boundaries and user-friendly error handling throughout the frontend"
              inputs={[
                "API errors and network failures",
                "Component rendering errors",
                "User input validation errors",
                "File upload failures"
              ]}
              outputs={[
                "User-friendly error messages",
                "Graceful error recovery",
                "Toast notifications",
                "Fallback UI components"
              ]}
              tech="React ErrorBoundary + Toast Libraries + Form Validation"
              type="security"
            />
          </FlowSection>

          {/* Step 2.5: Error Handling & Monitoring */}
          <FlowSection
            sectionId="monitoring"
            title="Error Handling & Monitoring"
            icon={Activity}
            color="border-yellow-500"
            bgColor="bg-white"
            stepNumber="2.5"
          >
            <ProcessStep
              number="2.5.1"
              title="Application Monitoring & Alerting"
              details="Real-time monitoring, error tracking, and performance metrics for both frontend and backend"
              inputs={[
                "Application errors and exceptions",
                "Performance metrics and logs",
                "User interaction data",
                "System health indicators"
              ]}
              outputs={[
                "Real-time error alerts",
                "Performance dashboards",
                "User behavior insights",
                "System health reports"
              ]}
              tech="Sentry + CloudWatch + Datadog + Custom Logging"
              type="parallel"
            />

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <TechCard
                name="Sentry"
                description="Error tracking and performance monitoring"
                color="border-yellow-400"
                icon={AlertTriangle}
                features={[
                  "Real-time error tracking",
                  "Performance monitoring",
                  "Release tracking",
                  "Custom error boundaries",
                  "User context capture",
                  "Alert notifications"
                ]}
              />
              
              <TechCard
                name="CloudWatch"
                description="AWS infrastructure monitoring"
                color="border-orange-400"
                icon={Activity}
                features={[
                  "API Gateway metrics",
                  "Lambda function logs",
                  "S3 access patterns",
                  "Custom application metrics",
                  "Automated scaling triggers",
                  "Cost monitoring"
                ]}
              />
              
              <TechCard
                name="Custom Logging"
                description="Application-specific logging system"
                color="border-blue-400"
                icon={FileText}
                features={[
                  "Structured JSON logging",
                  "User action tracking",
                  "API request/response logs",
                  "ML job status tracking",
                  "Security event logging",
                  "Performance bottleneck detection"
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-3">🚨 Monitoring Implementation Strategy</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-yellow-800 mb-2">Frontend Monitoring</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Error Boundaries:</strong> Catch React component errors
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>API Error Handling:</strong> Network failure recovery
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Performance Metrics:</strong> Load times, bundle size
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>User Analytics:</strong> Feature usage, conversion funnels
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-800 mb-2">Backend Monitoring</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>API Metrics:</strong> Response times, error rates
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Database Performance:</strong> Query times, connection pools
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>ML Job Tracking:</strong> Processing times, failure rates
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Resource Usage:</strong> CPU, memory, disk utilization
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 3: Backend API Layer */}
          <FlowSection
            sectionId="backend"
            title="Backend: FastAPI Server"
            icon={Server}
            color="border-orange-500"
            bgColor="bg-white"
            stepNumber="3"
          >
            <ProcessStep
              number="3.1"
              title="FastAPI Endpoints & Middleware"
              details="RESTful API with file handling, database operations, and ML service integration"
              inputs={[
                "HTTP requests from frontend",
                "File uploads (multipart/form-data)",
                "Authentication tokens",
                "Configuration parameters"
              ]}
              outputs={[
                "JSON API responses",
                "File upload confirmations",
                "Job status updates",
                "Processed results data"
              ]}
              tech="FastAPI + Pydantic + Python-multipart + CORS"
              apiEndpoints={[
                "POST /upload - File upload to S3",
                "POST /forecast - Trigger ML processing", 
                "GET /jobs/{job_id} - Get job status",
                "GET /results/{job_id} - Fetch results",
                "GET /health - Health check"
              ]}
            />

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-3">🔧 FastAPI Implementation Details</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-orange-800">File Upload Endpoint</h5>
                    <div className="text-xs text-orange-600 mt-1 font-mono">
                      <div>@app.post("/upload")</div>
                      <div>async def upload_file(</div>
                      <div>&nbsp;&nbsp;file: UploadFile,</div>
                      <div>&nbsp;&nbsp;user_id: str = Depends(get_user)</div>
                      <div>)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-orange-800">S3 Integration</h5>
                    <div className="text-xs text-orange-600 mt-1">
                      <div>• Boto3 client for AWS S3</div>
                      <div>• Presigned URLs for secure access</div>
                      <div>• File validation before upload</div>
                      <div>• Metadata storage in Supabase</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">🛡️ Security & Middleware</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-blue-800">CORS Configuration</h5>
                    <div className="text-xs text-blue-600 mt-1">
                      <div>• Allow specific origins only</div>
                      <div>• Credentials: true</div>
                      <div>• Specific HTTP methods</div>
                      <div>• Custom headers allowed</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-blue-800">Authentication Middleware</h5>
                    <div className="text-xs text-blue-600 mt-1">
                      <div>• JWT token validation</div>
                      <div>• Supabase user verification</div>
                      <div>• Rate limiting per user</div>
                      <div>• Request logging</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-3">📋 Complete Backend Structure</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-orange-800 text-sm">Core Dependencies</h5>
                  <div className="text-xs text-orange-600 mt-1 space-y-1">
                    <div>• fastapi</div>
                    <div>• pydantic</div>
                    <div>• uvicorn</div>
                    <div>• python-multipart</div>
                    <div>• python-jose[cryptography]</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-orange-800 text-sm">Integration Libraries</h5>
                  <div className="text-xs text-orange-600 mt-1 space-y-1">
                    <div>• boto3 (AWS S3)</div>
                    <div>• supabase (Database)</div>
                    <div>• requests (ML service)</div>
                    <div>• pandas (Data processing)</div>
                    <div>• python-dotenv (Environment)</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-orange-800 text-sm">Environment Variables</h5>
                  <div className="text-xs text-orange-600 mt-1 space-y-1">
                    <div>• SUPABASE_URL</div>
                    <div>• SUPABASE_ANON_KEY</div>
                    <div>• AWS_ACCESS_KEY_ID</div>
                    <div>• AWS_SECRET_ACCESS_KEY</div>
                    <div>• ML_SERVICE_URL</div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 4: Data Storage Layer */}
          <FlowSection
            sectionId="storage"
            title="Data Storage: AWS S3 + Supabase"
            icon={Database}
            color="border-purple-500"
            bgColor="bg-white"
            stepNumber="4"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <ProcessStep
                number="4.1"
                title="AWS S3 File Storage"
                details="Secure file storage for uploaded CSV/Excel files with proper IAM permissions"
                inputs={[
                  "Uploaded CSV/Excel files",
                  "File metadata",
                  "User authentication context",
                  "S3 bucket configuration"
                ]}
                outputs={[
                  "Secure S3 file URLs",
                  "File access permissions",
                  "Storage confirmation",
                  "Metadata for database"
                ]}
                tech="AWS S3 + IAM Roles + Boto3"
              />

              <ProcessStep
                number="4.2"
                title="Supabase Database"
                details="PostgreSQL database for metadata, job status, and results storage"
                inputs={[
                  "File metadata from S3",
                  "User information",
                  "Job configurations",
                  "ML processing results"
                ]}
                outputs={[
                  "Persistent metadata storage",
                  "Job status tracking",
                  "Results data storage",
                  "User-specific data access"
                ]}
                tech="Supabase (PostgreSQL) + Row-Level Security"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3">🗄️ Supabase Table Structure</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-purple-800">uploads</h5>
                    <div className="text-xs text-purple-600 mt-1 space-y-1">
                      <div>• id (uuid, primary key)</div>
                      <div>• user_id (uuid, foreign key)</div>
                      <div>• filename (text)</div>
                      <div>• s3_url (text)</div>
                      <div>• file_size (bigint)</div>
                      <div>• upload_date (timestamp)</div>
                      <div>• status (enum)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-purple-800">forecast_jobs</h5>
                    <div className="text-xs text-purple-600 mt-1 space-y-1">
                      <div>• id (uuid, primary key)</div>
                      <div>• upload_id (uuid, foreign key)</div>
                      <div>• user_id (uuid, foreign key)</div>
                      <div>• config (jsonb)</div>
                      <div>• status (enum)</div>
                      <div>• created_at (timestamp)</div>
                      <div>• completed_at (timestamp)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-purple-800">forecast_results</h5>
                    <div className="text-xs text-purple-600 mt-1 space-y-1">
                      <div>• id (uuid, primary key)</div>
                      <div>• job_id (uuid, foreign key)</div>
                      <div>• results_data (jsonb)</div>
                      <div>• performance_metrics (jsonb)</div>
                      <div>• model_info (jsonb)</div>
                      <div>• created_at (timestamp)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">☁️ AWS S3 Configuration</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-blue-800">Bucket Structure</h5>
                    <div className="text-xs text-blue-600 mt-1 space-y-1">
                      <div>• forecasting-app-uploads/</div>
                      <div>├── user-user_id/</div>
                      <div>├── timestamp-filename</div>
                      <div>└── results/</div>
                      <div>└── job_id/</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-blue-800">IAM Permissions</h5>
                    <div className="text-xs text-blue-600 mt-1 space-y-1">
                      <div>• s3:PutObject (uploads)</div>
                      <div>• s3:GetObject (downloads)</div>
                      <div>• s3:ListBucket (listings)</div>
                      <div>• s3:DeleteObject (cleanup)</div>
                      <div>• Least privilege principle</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-blue-800">Security Features</h5>
                    <div className="text-xs text-blue-600 mt-1 space-y-1">
                      <div>• Server-side encryption</div>
                      <div>• Presigned URLs (time-limited)</div>
                      <div>• CORS configuration</div>
                      <div>• Versioning enabled</div>
                      <div>• Access logging</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 5: ML Service Integration */}
          <FlowSection
            sectionId="mlIntegration"
            title="ML Service Integration"
            icon={Brain}
            color="border-indigo-500"
            bgColor="bg-white"
            stepNumber="5"
          >
            <ProcessStep
              number="5.1"
              title="External ML Service Communication"
              details="Proxy requests to your separate ML service repository with job queue management"
              inputs={[
                "S3 file URLs from storage layer",
                "Forecast configuration parameters",
                "User authentication context",
                "ML service API credentials"
              ]}
              outputs={[
                "ML job initiation confirmation",
                "Real-time processing status",
                "Forecast results and metrics",
                "Model performance data"
              ]}
              tech="HTTP Client + Job Queue + Async Processing"
              apiEndpoints={[
                "POST /ml/forecast - Start ML job",
                "GET /ml/jobs/{id}/status - Check status",
                "GET /ml/jobs/{id}/results - Get results",
                "POST /ml/jobs/{id}/cancel - Cancel job"
              ]}
              type="parallel"
            />

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-800 mb-3">🔄 ML Service Communication Flow</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border flex items-center gap-3">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-indigo-800">Job Submission</h5>
                      <p className="text-xs text-indigo-600">Send S3 URL + config to ML service</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border flex items-center gap-3">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-indigo-800">Status Polling</h5>
                      <p className="text-xs text-indigo-600">Regular status checks with exponential backoff</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border flex items-center gap-3">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-indigo-800">Results Retrieval</h5>
                      <p className="text-xs text-indigo-600">Fetch results and store in Supabase</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-3">⚡ Async Job Management</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-green-800">Job States</h5>
                    <div className="text-xs text-green-600 mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        PENDING - Job queued
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        PROCESSING - ML running
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        COMPLETED - Results ready
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        FAILED - Error occurred
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h5 className="text-sm font-semibold text-green-800">Background Tasks</h5>
                    <div className="text-xs text-green-600 mt-1 space-y-1">
                      <div>• Celery/Redis for task queue</div>
                      <div>• Periodic status updates</div>
                      <div>• Error handling & retry logic</div>
                      <div>• Job timeout management</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-bold text-indigo-800 mb-3">🔌 ML Service Integration Code Example</h4>
                              <div className="text-xs font-mono bg-white p-4 rounded border text-gray-800">
                <div className="mb-2"># FastAPI backend ML service integration</div>
                <div className="mb-1">async def start_forecast_job(s3_url: str, config: dict):</div>
                <div className="ml-4 mb-1">ml_payload = &#123;</div>
                <div className="ml-8 mb-1">"csv_file_s3_url": s3_url,</div>
                <div className="ml-8 mb-1">"forecast_horizon": config.get("horizon", 7),</div>
                <div className="ml-8 mb-1">"model_name": config.get("model", "xgboost"),</div>
                <div className="ml-8 mb-1">"feature_groups": config.get("features", []),</div>
                <div className="ml-4 mb-1">&#125;</div>
                <div className="ml-4 mb-2">response = await http_client.post(ML_SERVICE_URL + "/forecast", json=ml_payload)</div>
                <div className="ml-4">return response.json()["job_id"]</div>
              </div>
            </div>
          </FlowSection>

          {/* Step 6: Testing & Quality Assurance */}
          <FlowSection
            sectionId="testing"
            title="Testing & Quality Assurance"
            icon={TestTube}
            color="border-cyan-500"
            bgColor="bg-white"
            stepNumber="6"
          >
            <ProcessStep
              number="6.1"
              title="Comprehensive Testing Strategy"
              details="Multi-layer testing approach covering unit, integration, and end-to-end testing"
              inputs={[
                "Frontend components and hooks",
                "Backend API endpoints",
                "Database operations",
                "ML service integration"
              ]}
              outputs={[
                "Automated test suites",
                "Code coverage reports",
                "CI/CD integration",
                "Quality gate enforcement"
              ]}
              tech="Jest + React Testing Library + Pytest + Playwright"
              type="success"
            />

            <div className="mt-6 grid md:grid-cols-4 gap-4">
              <TechCard
                name="Frontend Testing"
                description="React component and hook testing"
                color="border-cyan-400"
                icon={Code}
                features={[
                  "Jest unit tests",
                  "React Testing Library",
                  "Component snapshot testing",
                  "Hook testing utilities",
                  "Mock API responses",
                  "Accessibility testing"
                ]}
              />
              
              <TechCard
                name="Backend Testing"
                description="API and service layer testing"
                color="border-blue-400"
                icon={Server}
                features={[
                  "Pytest for API tests",
                  "FastAPI TestClient",
                  "Database test fixtures",
                  "Mock external services",
                  "Authentication testing",
                  "Error handling tests"
                ]}
              />
              
              <TechCard
                name="Integration Testing"
                description="End-to-end workflow testing"
                color="border-purple-400"
                icon={GitBranch}
                features={[
                  "Playwright E2E tests",
                  "API integration tests",
                  "Database integration",
                  "File upload workflows",
                  "ML service integration",
                  "User journey testing"
                ]}
              />
              
              <TechCard
                name="Quality Gates"
                description="Automated quality enforcement"
                color="border-green-400"
                icon={CheckCircle}
                features={[
                  "Code coverage > 80%",
                  "ESLint + Prettier",
                  "Type checking (TypeScript)",
                  "Security vulnerability scans",
                  "Performance budgets",
                  "Accessibility audits"
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <h4 className="font-bold text-cyan-800 mb-3">🧪 Testing Implementation</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-cyan-800 mb-2">Test Structure</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Unit Tests:</strong> Individual components/functions (70%)
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Integration Tests:</strong> Component interactions (20%)
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>E2E Tests:</strong> Complete user workflows (10%)
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Visual Tests:</strong> Component snapshot testing
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-cyan-800 mb-2">CI/CD Integration</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Pre-commit:</strong> Linting, formatting, type checks
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>PR Checks:</strong> Test suite, coverage, security
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Staging Deploy:</strong> Integration tests, E2E tests
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Production:</strong> Smoke tests, monitoring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 7: Security Layer */}
          <FlowSection
            sectionId="security"
            title="Security & Best Practices"
            icon={Shield}
            color="border-red-500"
            bgColor="bg-white"
            stepNumber="7"
          >
            <ProcessStep
              number="7.1"
              title="Comprehensive Security Implementation"
              details="Multi-layered security approach covering authentication, authorization, data protection, and API security"
              inputs={[
                "User authentication requests",
                "API calls requiring authorization",
                "Sensitive environment variables",
                "File uploads and data transfers"
              ]}
              outputs={[
                "Secure authenticated sessions",
                "Encrypted data transmission",
                "Protected API endpoints",
                "Audit logs and monitoring"
              ]}
              tech="JWT + HTTPS + IAM + Row-Level Security + CORS"
              type="security"
            />

            <div className="mt-6 grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <Lock size={16} />
                  Authentication
                </h4>
                <ul className="text-xs text-red-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    JWT token validation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Supabase Auth integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    OAuth provider support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Session timeout handling
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <Key size={16} />
                  Authorization
                </h4>
                <ul className="text-xs text-orange-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Row-level security (RLS)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    User-specific data access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    API rate limiting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Role-based permissions
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <Cloud size={16} />
                  Data Protection
                </h4>
                <ul className="text-xs text-green-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    HTTPS everywhere
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    S3 server-side encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Environment variable security
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Data validation & sanitization
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Globe size={16} />
                  API Security
                </h4>
                <ul className="text-xs text-blue-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    CORS properly configured
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Request size limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Input validation middleware
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" />
                    Error message sanitization
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 mb-3">🔒 Security Implementation Checklist</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-800 mb-2">Environment Security</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Never hardcode API keys or secrets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Use .env files for development</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Environment variables in production</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Separate keys for dev/staging/prod</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-red-800 mb-2">Production Security</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>SSL/TLS certificates configured</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Security headers implemented</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Regular security updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Monitoring and alerting setup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 8: Deployment & Scalability */}
          <FlowSection
            sectionId="deployment"
            title="Deployment & Scalability"
            icon={Rocket}
            color="border-emerald-500"
            bgColor="bg-white"
            stepNumber="8"
          >
            <ProcessStep
              number="8.1"
              title="CI/CD Pipeline & Infrastructure"
              details="Automated deployment pipeline with containerization and scalable infrastructure"
              inputs={[
                "Source code commits",
                "Docker configurations",
                "Infrastructure as Code",
                "Environment configurations"
              ]}
              outputs={[
                "Automated deployments",
                "Scalable infrastructure",
                "Environment isolation",
                "Zero-downtime updates"
              ]}
              tech="GitHub Actions + Docker + AWS ECS/Lambda + Terraform"
              type="parallel"
            />

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <TechCard
                name="Containerization"
                description="Docker containers for consistent deployments"
                color="border-emerald-400"
                icon={Layers}
                features={[
                  "Multi-stage Docker builds",
                  "Optimized image sizes",
                  "Environment consistency",
                  "Easy local development",
                  "Container orchestration",
                  "Health check endpoints"
                ]}
              />
              
              <TechCard
                name="CI/CD Pipeline"
                description="Automated testing and deployment"
                color="border-blue-400"
                icon={GitBranch}
                features={[
                  "GitHub Actions workflows",
                  "Automated testing",
                  "Security scanning",
                  "Environment promotion",
                  "Rollback capabilities",
                  "Deployment notifications"
                ]}
              />
              
              <TechCard
                name="Scalable Infrastructure"
                description="Auto-scaling cloud infrastructure"
                color="border-purple-400"
                icon={Cloud}
                features={[
                  "AWS ECS/Fargate",
                  "Application Load Balancer",
                  "Auto-scaling policies",
                  "CDN for static assets",
                  "Multi-AZ deployment",
                  "Infrastructure as Code"
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-3">🚀 Deployment Strategy</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-emerald-800 mb-2">Environment Structure</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Development:</strong> Local Docker + hot reload
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Staging:</strong> Production-like environment
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Production:</strong> High availability setup
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>DR:</strong> Disaster recovery environment
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-emerald-800 mb-2">Scalability Features</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Horizontal Scaling:</strong> Multiple container instances
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Database:</strong> Supabase managed scaling
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>File Storage:</strong> S3 unlimited capacity
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>CDN:</strong> CloudFront for global distribution
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3">📚 Documentation & Developer Experience</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">API Documentation</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• FastAPI auto-generated docs</li>
                    <li>• OpenAPI/Swagger UI</li>
                    <li>• Interactive API testing</li>
                    <li>• Request/response examples</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">Component Library</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Storybook for React components</li>
                    <li>• Design system documentation</li>
                    <li>• Interactive component playground</li>
                    <li>• Accessibility guidelines</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-semibold text-blue-800 text-sm">Developer Setup</h5>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Docker Compose for local dev</li>
                    <li>• Environment setup guides</li>
                    <li>• Contributing guidelines</li>
                    <li>• Code style documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* Step 9: Results & Visualization */}
          <FlowSection
            sectionId="visualization"
            title="Results Visualization & Export"
            icon={BarChart3}
            color="border-teal-500"
            bgColor="bg-white"
            stepNumber="9"
            isLast={true}
          >
            <ProcessStep
              number="7.1"
              title="Interactive Dashboard & Export Options"
              details="Dynamic visualizations with multiple export formats and sharing capabilities"
              inputs={[
                "Forecast results from ML service",
                "Model performance metrics",
                "User visualization preferences",
                "Export format requirements"
              ]}
              outputs={[
                "Interactive charts and graphs",
                "Performance metric displays",
                "Downloadable reports (PDF, CSV)",
                "Shareable dashboard links"
              ]}
              tech="Recharts + React PDF + CSV Export + Chart.js"
              type="success"
            />

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <TechCard
                name="Recharts"
                description="React chart library for interactive visualizations"
                color="border-teal-400"
                icon={BarChart3}
                features={[
                  "Time series line charts",
                  "Confidence interval areas",
                  "Interactive tooltips",
                  "Zoom and pan functionality",
                  "Responsive design",
                  "Custom styling options"
                ]}
              />
              
              <TechCard
                name="Export Options"
                description="Multiple formats for data sharing"
                color="border-blue-400"
                icon={Download}
                features={[
                  "CSV forecast data export",
                  "PDF report generation",
                  "PNG/JPG chart images",
                  "JSON data format",
                  "Excel workbook export",
                  "Email report delivery"
                ]}
              />
              
              <TechCard
                name="Dashboard Features"
                description="Comprehensive results presentation"
                color="border-purple-400"
                icon={Monitor}
                features={[
                  "Multi-menu item views",
                  "Performance comparisons",
                  "Model selection insights",
                  "Real-time status updates",
                  "Historical data overlay",
                  "Responsive mobile design"
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <h4 className="font-bold text-teal-800 mb-3">📊 Visualization Components</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-teal-800 mb-2">Chart Types</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Time Series:</strong> Historical vs predicted values with confidence intervals
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Performance Metrics:</strong> RMSE, MAE, MAPE comparison charts
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Model Selection:</strong> Best model breakdown per menu item
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Feature Importance:</strong> Top contributing features visualization
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-teal-800 mb-2">Interactive Features</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Filtering:</strong> Menu item, date range, model type filters
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Tooltips:</strong> Detailed information on hover
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Zoom:</strong> Time period focus and drill-down
                    </div>
                    <div className="p-2 bg-white rounded text-xs">
                      <strong>Comparison:</strong> Side-by-side model performance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FlowSection>
        </div>

        {/* Architecture Summary */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🏗️ Enterprise-Grade Web App Architecture</h3>
          <p className="text-lg opacity-90 mb-6">
            Production-ready forecasting web application with comprehensive monitoring, testing, security, 
            and scalable infrastructure designed for enterprise deployment.
          </p>
          
          <div className="grid md:grid-cols-6 gap-4 mt-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Monitor size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">React Frontend</h4>
              <p className="text-sm opacity-90">TypeScript + Testing</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Server size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">FastAPI Backend</h4>
              <p className="text-sm opacity-90">Python + Monitoring</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Database size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">Supabase + S3</h4>
              <p className="text-sm opacity-90">Data + Files</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Brain size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">ML Integration</h4>
              <p className="text-sm opacity-90">Async Jobs</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Shield size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">Security + Testing</h4>
              <p className="text-sm opacity-90">Auth + CI/CD</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Rocket size={24} className="mx-auto mb-2" />
              <h4 className="font-bold mb-2">Deployment</h4>
              <p className="text-sm opacity-90">Docker + AWS</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">User Upload</div>
            <ArrowRight size={16} className="text-white opacity-70" />
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">FastAPI</div>
            <ArrowRight size={16} className="text-white opacity-70" />
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">S3 + Supabase</div>
            <ArrowRight size={16} className="text-white opacity-70" />
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">ML Service</div>
            <ArrowRight size={16} className="text-white opacity-70" />
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">Results Dashboard</div>
          </div>

          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
            <h4 className="font-bold text-white mb-3">🏢 Enterprise-Ready Features</h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Activity size={20} className="mx-auto mb-1" />
                <p className="text-sm">Real-time Monitoring</p>
              </div>
              <div className="text-center">
                <TestTube size={20} className="mx-auto mb-1" />
                <p className="text-sm">Comprehensive Testing</p>
              </div>
              <div className="text-center">
                <GitBranch size={20} className="mx-auto mb-1" />
                <p className="text-sm">CI/CD Pipeline</p>
              </div>
              <div className="text-center">
                <Cloud size={20} className="mx-auto mb-1" />
                <p className="text-sm">Auto-scaling Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}