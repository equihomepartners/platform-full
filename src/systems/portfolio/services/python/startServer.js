/**
 * Python Server Starter
 * 
 * This script is used to start the Python server from Electron.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the Python executable path
const getPythonPath = () => {
  // Try common Python executable names
  const pythonCommands = ['python3', 'python', 'py'];
  
  for (const cmd of pythonCommands) {
    try {
      // Check if the command exists
      const result = require('child_process').spawnSync(cmd, ['-c', 'print("Python found")']);
      if (result.status === 0) {
        return cmd;
      }
    } catch (error) {
      // Command not found, try the next one
    }
  }
  
  return null;
};

// Start the Python server
const startPythonServer = () => {
  return new Promise((resolve, reject) => {
    // Get the Python executable path
    const pythonPath = getPythonPath();
    if (!pythonPath) {
      return reject(new Error('Python executable not found'));
    }
    
    // Get the path to the Python server script
    const scriptPath = path.join(__dirname, 'api.py');
    
    // Check if the script exists
    if (!fs.existsSync(scriptPath)) {
      return reject(new Error(`Python script not found at ${scriptPath}`));
    }
    
    // Start the Python server
    const pythonProcess = spawn(pythonPath, [scriptPath]);
    
    // Handle process events
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python server stdout: ${data}`);
      
      // Check if the server is ready
      if (data.toString().includes('Running on')) {
        resolve({ success: true, process: pythonProcess });
      }
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python server stderr: ${data}`);
    });
    
    pythonProcess.on('error', (error) => {
      console.error(`Python server error: ${error.message}`);
      reject(error);
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`Python server exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`Python server exited with code ${code}`));
      }
    });
    
    // Set a timeout in case the server doesn't start
    setTimeout(() => {
      // Check if the server is running
      const http = require('http');
      const req = http.get('http://localhost:8000/health', (res) => {
        if (res.statusCode === 200) {
          resolve({ success: true, process: pythonProcess });
        } else {
          reject(new Error(`Python server health check failed with status ${res.statusCode}`));
        }
      });
      
      req.on('error', () => {
        reject(new Error('Python server health check failed'));
      });
      
      req.end();
    }, 5000);
  });
};

// Export the function
module.exports = {
  startPythonServer
};
