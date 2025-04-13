import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Python Server Manager Component
 *
 * This component manages the Python server for the simulation calculator.
 * It automatically starts the server when the component is mounted.
 */
const PythonServerManager: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'starting' | 'running' | 'error'>('starting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStartingServer, setIsStartingServer] = useState(false);

  // Function to start the Python server
  const startPythonServer = async () => {
    try {
      setIsStartingServer(true);

      // In a real production environment, we would use a backend endpoint to start the server
      // For now, we'll just show instructions to the user
      console.log('Attempting to start Python server...');

      // First check if the server is already running
      const isRunning = await checkServerStatus();

      if (isRunning) {
        console.log('Python server is already running');
        setServerStatus('running');
        setErrorMessage(null);
        return;
      }

      // Server is not running, show detailed instructions
      setServerStatus('error');
      setErrorMessage(
        'Python server is not running. The simulation will use JavaScript calculations as a fallback, but Python provides more accurate results.\n\n' +
        'To start the Python server:\n\n' +
        '1. Open a new terminal window\n' +
        '2. Navigate to the Python server directory:\n' +
        '   cd src/systems/portfolio/services/python\n\n' +
        '3. Run the server:\n' +
        '   python api.py\n\n' +
        'Troubleshooting:\n' +
        '- Make sure Python 3.6+ is installed\n' +
        '- Check that required packages are installed (pip install flask flask-cors numpy pandas)\n' +
        '- Ensure port 8000 is not in use by another application'
      );
    } catch (error) {
      console.error('Error starting Python server:', error);
      setServerStatus('error');
      setErrorMessage('Failed to start Python server. See console for details.');
    } finally {
      setIsStartingServer(false);
    }
  };

  // Function to check if the Python server is running
  const checkServerStatus = async () => {
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
        return true;
      } else {
        if (serverStatus !== 'error') {
          setServerStatus('error');
          setErrorMessage('Python server is not responding');
        }
        return false;
      }
    } catch (error) {
      if (serverStatus !== 'error') {
        setServerStatus('error');
        setErrorMessage('Failed to connect to Python server');
      }
      return false;
    }
  };

  // Start the Python server when the component mounts
  useEffect(() => {
    const initServer = async () => {
      // First check if the server is already running
      const isRunning = await checkServerStatus();

      // If not running, try to start it
      if (!isRunning) {
        await startPythonServer();
      }
    };

    initServer();

    // Check server status periodically
    const intervalId = setInterval(checkServerStatus, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // If the server is starting, show a loading indicator
  if (serverStatus === 'starting' || isStartingServer) {
    return (
      <div className="banking-flex banking-items-center banking-justify-center banking-p-4 banking-bg-primary-50 banking-rounded-lg banking-border banking-border-primary-200">
        <Loader2 className="banking-h-5 banking-w-5 banking-text-primary-600 banking-animate-spin banking-mr-2" />
        <p className="banking-text-primary-700">Starting Python server...</p>
      </div>
    );
  }

  // If there's an error, show an error message with a retry button
  if (serverStatus === 'error') {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#fee2e2',
        borderRadius: '0.5rem',
        border: '1px solid #fca5a5',
        margin: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '500',
          color: '#b91c1c',
          marginBottom: '0.5rem'
        }}>Python Server Not Running</h3>
        <p style={{
          color: '#b91c1c',
          marginBottom: '1rem',
          whiteSpace: 'pre-line',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {errorMessage || 'Failed to connect to Python server'}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={startPythonServer}
            disabled={isStartingServer}
            style={{
              backgroundColor: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isStartingServer ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: isStartingServer ? 0.7 : 1
            }}
          >
            {isStartingServer ? (
              <>
                <Loader2 size={16} style={{
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }} />
                Checking...
              </>
            ) : 'Check Again'}
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: 'transparent',
              color: '#b91c1c',
              border: '1px solid #b91c1c',
              borderRadius: '0.25rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // If the server is running, don't show anything (clean UI)
  return null;
};

export default PythonServerManager;
