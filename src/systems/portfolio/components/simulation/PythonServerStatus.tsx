import React, { useState, useEffect } from 'react';
import { checkPythonServer, startPythonServer } from '../../services/pythonServerManager';

interface PythonServerStatusProps {
  onStatusChange?: (isRunning: boolean) => void;
}

/**
 * Python Server Status Component
 *
 * Displays the status of the Python server and allows starting it.
 */
const PythonServerStatus: React.FC<PythonServerStatusProps> = ({ onStatusChange }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isStarting, setIsStarting] = useState<boolean>(false);

  // Check the Python server status on component mount
  useEffect(() => {
    let isMounted = true;

    const checkServer = async () => {
      if (!isMounted) return;

      setIsChecking(true);
      const running = await checkPythonServer();

      if (!isMounted) return;

      setIsRunning(running);
      setIsChecking(false);

      if (onStatusChange) {
        onStatusChange(running);
      }
    };

    checkServer();

    // Set up a periodic check with a longer interval to reduce console errors
    const interval = setInterval(checkServer, 10000); // Check every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [onStatusChange]);

  // Handle starting the Python server
  const handleStartServer = async () => {
    setIsStarting(true);

    try {
      const success = await startPythonServer();

      if (success) {
        setIsRunning(true);
        if (onStatusChange) {
          onStatusChange(true);
        }
      } else {
        // If automatic start failed, show manual instructions
        console.log('Manual server start may be required');
      }
    } catch (error) {
      console.error('Error in handleStartServer:', error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '0.75rem',
      backgroundColor: isRunning ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      borderRadius: '0.375rem',
      marginBottom: '1rem',
      border: `1px solid ${isRunning ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '0.75rem',
          height: '0.75rem',
          borderRadius: '50%',
          backgroundColor: isRunning ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
          marginRight: '0.5rem'
        }} />

        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            fontWeight: '600',
            color: isRunning ? 'rgb(5, 150, 105)' : 'rgb(220, 38, 38)'
          }}>
            Python Server: {isChecking ? 'Checking...' : (isRunning ? 'Running' : 'Not Running')}
          </p>

          {!isRunning && (
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              color: 'rgb(107, 114, 128)'
            }}>
              Python calculations provide more accurate results
            </p>
          )}
        </div>

        {!isRunning && !isStarting && (
          <button
            onClick={handleStartServer}
            style={{
              backgroundColor: 'rgb(79, 70, 229)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Start Server
          </button>
        )}

        {isStarting && (
          <div style={{
            padding: '0.5rem 0.75rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'rgb(107, 114, 128)'
          }}>
            Starting...
          </div>
        )}
      </div>

      {!isRunning && !isStarting && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '0.25rem',
          fontSize: '0.75rem',
          color: 'rgb(75, 85, 99)'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Start the Python Server:</p>
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Open a terminal</li>
            <li>Run: <code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '0.1rem 0.25rem', borderRadius: '0.25rem' }}>./start_python_server.sh</code></li>
            <li>Keep the terminal window open while using the simulation</li>
          </ol>
          <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>The Python server provides more accurate calculations and must be running for optimal results.</p>
        </div>
      )}
    </div>
  );
};

export default PythonServerStatus;
