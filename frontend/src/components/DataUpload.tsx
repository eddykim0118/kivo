import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle, Info, Eye } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Location } from '../types';

interface DataUploadProps {
  onDataUpload: (data: any) => void;
}

interface FilePreview {
  columns: string[];
  preview: any[];
  total_rows: string;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState<string>('');
  
  // Column mapping fields
  const [dateCol, setDateCol] = useState('');
  const [menuCol, setMenuCol] = useState('');
  const [targetCol, setTargetCol] = useState('');

  useEffect(() => {
    // Fetch user's locations
    const fetchLocations = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('owner_id', user.id)
          .eq('status', 'approved');
        if (data) setLocations(data);
      }
    };
    fetchLocations();
  }, []);

  // Add server health check
  const checkServerHealth = async () => {
    const endpoints = [
      'http://localhost:8000/api/health',      // Your web API
      'http://localhost:8001/api/v1/health',   // Your ML service (correct endpoint)
      'http://localhost:8000/',                // Fallback for web API
      'http://localhost:8001/',                // Fallback for ML service
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(endpoint, { timeout: 5000 });
        console.log(`✅ Server accessible at: ${endpoint}`, response.data);
        return endpoint.split('/')[2]; // Return the host:port
      } catch (err) {
        console.log(`❌ Server not accessible at: ${endpoint}`);
      }
    }
    return null;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
      setFilePreview(null);
      
      // Reset column selections
      setDateCol('');
      setMenuCol('');
      setTargetCol('');
      
      // Check server health first
      console.log('Checking server health...');
      const serverEndpoint = await checkServerHealth();
      if (!serverEndpoint) {
        setError('Cannot connect to server. Please ensure your backend is running.');
        return;
      }
      
      // Get file preview
      await getFilePreview(selectedFile);
    }
  };

  const getFilePreview = async (selectedFile: File) => {
    setPreviewLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    // Try multiple endpoints to debug
    const endpoints = [
      'http://localhost:8000/api/preview',     // Your web API
      'http://localhost:8001/api/v1/preview',  // Your ML service (might have this)
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying preview endpoint: ${endpoint}`);
        const response = await axios.post<FilePreview>(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        });
        
        console.log(`Success with endpoint: ${endpoint}`, response.data);
        setFilePreview(response.data);
        
        // Auto-select columns based on common patterns
        const columns = response.data.columns;
        const datePatterns = ['date', 'Date', 'DATE', 'order_date', 'OrderDate', 'timestamp'];
        const menuPatterns = ['item', 'Item', 'ITEM', 'product', 'Product', 'menu', 'Menu', 'name', 'Name'];
        const targetPatterns = ['sales', 'Sales', 'SALES', 'quantity', 'Quantity', 'revenue', 'Revenue', 'amount', 'Amount'];
        
        // Find matching columns
        const dateCol = columns.find((col: string) => datePatterns.some(pattern => col.toLowerCase().includes(pattern.toLowerCase()))) || '';
        const menuCol = columns.find((col: string) => menuPatterns.some(pattern => col.toLowerCase().includes(pattern.toLowerCase()))) || '';
        const targetCol = columns.find((col: string) => targetPatterns.some(pattern => col.toLowerCase().includes(pattern.toLowerCase()))) || '';
        
        setDateCol(dateCol);
        setMenuCol(menuCol);
        setTargetCol(targetCol);
        
        setPreviewLoading(false);
        return; // Exit the loop if successful
        
      } catch (err: any) {
        console.error(`Preview error with ${endpoint}:`, err.response?.status, err.message);
        
        // If this was the last endpoint, set error
        if (endpoint === endpoints[endpoints.length - 1]) {
          if (err.code === 'ERR_NETWORK') {
            setError('Cannot connect to server. Please ensure your backend is running and accessible.');
          } else if (err.response?.status === 404) {
            setError('Preview endpoint not found. Your server might not support file preview.');
          } else {
            setError('Failed to preview file. Please check the file format and try again.');
          }
        }
      }
    }
    
    setPreviewLoading(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    if (!locationId) {
      setError('Please select a location');
      return;
    }

    // Validate required fields
    if (!dateCol || !menuCol || !targetCol) {
      setError('Please select all required columns (date, menu/item, and target columns)');
      return;
    }

    // Add file validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(csv|xlsx|xls)$/)) {
      setError('Please upload a valid CSV or Excel file');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('date_col', dateCol);
    formData.append('menu_col', menuCol);
    formData.append('target_col', targetCol);
    formData.append('location_id', locationId);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });
      setSuccess('File uploaded and processed successfully!');
      onDataUpload(response.data);
    } catch (err: any) {
      console.error('Full upload error:', err);
      
      if (err.response) {
        const { status, data } = err.response;
        console.error('Server response:', data);
        console.error('Error details:', JSON.stringify(data, null, 2));
        
        if (status === 500) {
          setError(`Server error (500): ${data.detail || data.message || 'Internal server error. Check server logs for details.'}`);
        } else if (status === 422) {
          if (data.detail) {
            if (Array.isArray(data.detail)) {
              const missingFields = data.detail
                .filter((d: any) => d.msg === 'field required')
                .map((d: any) => d.loc ? d.loc.join('.') : 'unknown field');
              
              if (missingFields.length > 0) {
                setError(`Missing required fields: ${missingFields.join(', ')}`);
              } else {
                const errorMessages = data.detail.map((d: any) => 
                  `${d.loc ? d.loc.join('.') : 'field'}: ${d.msg || d.message || JSON.stringify(d)}`
                ).join('; ');
                setError(`Validation errors: ${errorMessages}`);
              }
            } else {
              setError(`Validation error: ${data.detail}`);
            }
          } else if (data.message) {
            setError(`Server error: ${data.message}`);
          } else {
            setError('Data validation failed. Please check your file format and column selections.');
          }
        } else if (status === 413) {
          setError('File too large. Please try a smaller file.');
        } else if (status === 415) {
          setError('File type not supported. Please upload a CSV or Excel file.');
        } else {
          setError(`Server error (${status}): ${data.message || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Data for Forecasting</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Select File</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".csv,.xlsx,.xls"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-gray-600">
                {file ? file.name : 'Click to select a file'}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Supported formats: CSV, Excel (max 10MB)
              </span>
            </label>
          </div>

          {file && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <p><strong>File:</strong> {file.name}</p>
                <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Column Mapping Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Column Mapping</h2>
          
          {previewLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading file preview...</p>
            </div>
          ) : filePreview ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Column
                </label>
                <select
                  value={dateCol}
                  onChange={(e) => setDateCol(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select date column...</option>
                  {filePreview.columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu/Item Column
                </label>
                <select
                  value={menuCol}
                  onChange={(e) => setMenuCol(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select menu/item column...</option>
                  {filePreview.columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales/Target Column
                </label>
                <select
                  value={targetCol}
                  onChange={(e) => setTargetCol(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select sales/target column...</option>
                  {filePreview.columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : file ? (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Unable to preview file. Please manually enter your column names:
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Column Name
                </label>
                <input
                  type="text"
                  value={dateCol}
                  onChange={(e) => setDateCol(e.target.value)}
                  placeholder="e.g., date, Date, order_date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu/Item Column Name
                </label>
                <input
                  type="text"
                  value={menuCol}
                  onChange={(e) => setMenuCol(e.target.value)}
                  placeholder="e.g., item_name, product, menu_item"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales/Target Column Name
                </label>
                <input
                  type="text"
                  value={targetCol}
                  onChange={(e) => setTargetCol(e.target.value)}
                  placeholder="e.g., sales, quantity, revenue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Upload a file to see column mapping options
            </p>
          )}
        </div>
      </div>

      {/* File Preview Section */}
      {filePreview && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold">File Preview</h2>
            <span className="ml-2 text-sm text-gray-500">
              (First 3 rows of {filePreview.total_rows})
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {filePreview.columns.map((col) => (
                    <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filePreview.preview.map((row, index) => (
                  <tr key={index} className="border-b">
                    {filePreview.columns.map((col) => (
                      <td key={col} className="px-4 py-2 text-sm text-gray-900">
                        {row[col] || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Required Format Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Required Data Format:</p>
            <p className="mb-2">Your file should contain these three types of columns:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Date:</strong> YYYY-MM-DD format (e.g., 2024-01-01)</li>
              <li><strong>Menu/Item:</strong> Product or menu item name</li>
              <li><strong>Sales:</strong> Numeric values to forecast</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

      {/* Location Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Location</h2>
        <select
          value={locationId}
          onChange={e => setLocationId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a location...</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading || !dateCol || !menuCol || !targetCol || !locationId}
        className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium ${
          !file || uploading || !dateCol || !menuCol || !targetCol || !locationId
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Processing File...' : 'Upload and Process File'}
      </button>
    </div>
  );
};

export default DataUpload;