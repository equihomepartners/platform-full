/**
 * Python Server Manager
 *
 * Utility to check if the Python server is running and start it if needed.
 */

// Check if the Python server is running
export const checkPythonServer = async (): Promise<boolean> => {
  try {
    // Use AbortController to set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    const response = await fetch('http://localhost:8000/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    // Don't log the error if it's just a connection refused error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.log('Python server is not running');
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Python server check timed out');
    } else {
      console.error('Error checking Python server:', error);
    }
    return false;
  }
};

// Start the Python server
export const startPythonServer = async (): Promise<boolean> => {
  try {
    // Check if the server is already running
    const isRunning = await checkPythonServer();
    if (isRunning) {
      console.log('Python server is already running');
      return true;
    }

    console.log('Starting Python server...');

    // Use the Electron API to start the Python server if in Electron environment
    if (window.electron) {
      const result = await window.electron.startPythonServer();
      console.log('Python server start result:', result);
      return result.success;
    } else {
      // In browser environment, use the server launcher
      try {
        // Call the server launcher endpoint
        const response = await fetch('http://localhost:3001/start-python-server', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Server launcher response:', result);

          // Wait a bit for the server to start
          await new Promise(resolve => setTimeout(resolve, 3000));

          // Check if the server is now running
          const serverStarted = await checkPythonServer();
          if (serverStarted) {
            console.log('Python server started successfully via server launcher');
            return true;
          }
        }

        // If server launcher failed or server didn't start, try starting the launcher
        console.log('Attempting to start server launcher...');

        // Open the launcher in a new window (this will be blocked by popup blockers unless triggered by a user action)
        const launcherWindow = window.open('/src/systems/portfolio/services/python/start_launcher.html', '_blank');
        if (launcherWindow) {
          // Close the window after a short delay
          setTimeout(() => launcherWindow.close(), 1000);
        }

        // Wait a bit for the launcher and server to start
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Check if the server is now running
        const serverStarted = await checkPythonServer();
        if (serverStarted) {
          console.log('Python server started successfully after launching server launcher');
          return true;
        } else {
          // If not running, show instructions to the user
          console.warn('Could not start Python server automatically. Please start it manually.');
          alert('Please start the Python server manually:\n\n' +
                '1. Open a terminal\n' +
                '2. Run: ./start_python_server.sh\n' +
                '3. Keep the terminal window open while using the simulation');
          return false;
        }
      } catch (err) {
        console.warn('Cannot automatically start Python server in browser environment:', err);

        // Show instructions to the user
        alert('Please start the Python server manually:\n\n' +
              '1. Open a terminal\n' +
              '2. Run: ./start_python_server.sh\n' +
              '3. Keep the terminal window open while using the simulation');

        return false;
      }
    }
  } catch (error) {
    console.error('Error starting Python server:', error);
    return false;
  }
};

// Stop the Python server
export const stopPythonServer = async (): Promise<boolean> => {
  try {
    // Use the Electron API to stop the Python server if in Electron environment
    if (window.electron) {
      const result = await window.electron.stopPythonServer();
      console.log('Python server stop result:', result);
      return result.success;
    } else {
      // In browser environment, we can't stop the server automatically
      console.warn('Cannot automatically stop Python server in browser environment');
      return false;
    }
  } catch (error) {
    console.error('Error stopping Python server:', error);
    return false;
  }
};

// Add a global type declaration for the Electron API
declare global {
  interface Window {
    electron?: {
      startPythonServer: () => Promise<{ success: boolean; message: string }>;
      stopPythonServer: () => Promise<{ success: boolean; message: string }>;
    };
  }
}

export default {
  checkPythonServer,
  startPythonServer,
  stopPythonServer
};
