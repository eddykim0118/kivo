import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const Callback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    // Simulate OAuth callback processing
    const processCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          return;
        }

        if (code) {
          // Simulate API call to exchange code for tokens
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          setStatus('success');
          setMessage('Authentication successful! Redirecting to dashboard...');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No authorization code received.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An error occurred during authentication.');
      }
    };

    processCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-8 print:shadow-none print:border-none">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 print:hidden"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 font-sans">OAuth Callback</h1>
          <div className="text-gray-500 text-sm mb-2">Authentication Status</div>
        </div>

        {/* Status Display */}
        <div className="text-center mb-8">
          {status === 'loading' && (
            <div className="mb-4 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-700 text-lg font-serif">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="mb-4 flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <p className="text-green-700 text-lg font-serif font-semibold">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 flex flex-col items-center">
              <XCircle className="w-12 h-12 text-red-600 mb-4" />
              <p className="text-red-700 text-lg font-serif font-semibold">{message}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 print:hidden">
          {status === 'error' && (
            <Link
              to="/"
              className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          )}
          {status === 'success' && (
            <Link
              to="/dashboard"
              className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500 font-serif">
          <p>This page handles OAuth authentication callbacks from external services.</p>
          <p className="mt-2">If you're not expecting to be here, please return to the home page.</p>
        </div>
      </div>
    </div>
  );
};

export default Callback; 