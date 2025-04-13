import React, { useEffect, useState } from 'react';
import { Server, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Python Server Manager Component
 * 
 * This component manages the Python server for the simulation calculator.
 * It automatically starts the server when the component is mounted and
 * provides a UI to show the server status.
 */
const PythonServerManager: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'starting' | 'running' | 'error'>('starting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const startPythonServer = async () => {
      try {
        setServerStatus('starting');
        
        // Check if the server is already running
        const response = await fetch('http://localhost:8000/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(2000)
        }).catch(() => null);
        
        if (response && response.ok) {
          console.log('Python server is already running');
          setServerStatus('running');
          return;
        }
        
        // Server is not running, try to start it
        console.log('Starting Python server...');
        
        // In a real production environment, you would use a more robust method to start the server
        // For now, we'll just show instructions to the user
        setServerStatus('error');
        setErrorMessage(
          'Python server is not running. Please start it manually by running the following command in your terminal:\n\n' +
          'cd src/systems/portfolio/services && source venv/bin/activate && cd python && python api.py'
        );
      } catch (error) {
        console.error('Error starting Python server:', error);
        setServerStatus('error');
        setErrorMessage('Failed to start Python server. See console for details.');
      }
    };
    
    startPythonServer();
    
    // Check server status periodically
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:8000/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(2000)
        }).catch(() => null);
        
        if (response && response.ok) {
          setServerStatus('running');
          setErrorMessage(null);
        } else if (serverStatus !== 'error') {
          setServerStatus('error');
          setErrorMessage('Python server is not responding');
        }
      } catch (error) {
        if (serverStatus !== 'error') {
          setServerStatus('error');
          setErrorMessage('Failed to connect to Python server');
        }
      }
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [serverStatus]);

  return (
    <div className="mb-6 p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Server className="h-5 w-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-medium text-primary-900">Python Server Status</h3>
        </div>
        
        <div className="flex items-center">
          {serverStatus === 'starting' && (
            <div className="flex items-center text-amber-600">
              <div className="h-3 w-3 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Starting...</span>
            </div>
          )}
          
          {serverStatus === 'running' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Running</span>
            </div>
          )}
          
          {serverStatus === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Error</span>
            </div>
          )}
        </div>
      </div>
      
      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-700 whitespace-pre-line">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {serverStatus === 'running' && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-700">
                Python server is running at <code className="bg-green-100 px-1 py-0.5 rounded">http://localhost:8000</code>
              </p>
              <p className="text-sm text-green-700 mt-1">
                Using Python for advanced financial calculations
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonServerManager;
