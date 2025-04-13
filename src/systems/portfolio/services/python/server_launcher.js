/**
 * Python Server Launcher
 * 
 * This script launches the Python server process directly.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Create a simple HTTP server to handle requests
const server = http.createServer((req, res) => {
  if (req.url === '/start-python-server') {
    console.log('Received request to start Python server');
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Start the Python server
    startPythonServer()
      .then(result => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: result.success, message: result.message }));
      })
      .catch(error => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: error.message }));
      });
  } else {
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(204);
      res.end();
      return;
    }
    
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Not found' }));
  }
});

// Start the server on port 3001
server.listen(3001, () => {
  console.log('Server launcher running on port 3001');
});

// Function to start the Python server
async function startPythonServer() {
  return new Promise((resolve, reject) => {
    try {
      // Get the Python executable path
      const pythonPath = getPythonPath();
      if (!pythonPath) {
        return reject(new Error('Python executable not found'));
      }
      
      // Get the path to the Python server script
      const scriptDir = path.join(__dirname);
      const scriptPath = path.join(scriptDir, 'api.py');
      
      // Check if the script exists
      if (!fs.existsSync(scriptPath)) {
        return reject(new Error(`Python script not found at ${scriptPath}`));
      }
      
      // Check if the server is already running
      checkServerRunning()
        .then(isRunning => {
          if (isRunning) {
            console.log('Python server is already running');
            return resolve({ success: true, message: 'Server is already running' });
          }
          
          console.log(`Starting Python server with: ${pythonPath} ${scriptPath}`);
          
          // Start the Python server
          const pythonProcess = spawn(pythonPath, [scriptPath], {
            detached: true, // Run in background
            stdio: 'ignore', // Ignore stdio to allow process to run independently
            cwd: scriptDir
          });
          
          // Detach the process so it continues running after this script exits
          pythonProcess.unref();
          
          // Wait a bit for the server to start
          setTimeout(() => {
            // Check if the server is now running
            checkServerRunning()
              .then(isRunning => {
                if (isRunning) {
                  console.log('Python server started successfully');
                  resolve({ success: true, message: 'Server started successfully' });
                } else {
                  console.error('Failed to start Python server');
                  reject(new Error('Failed to start Python server'));
                }
              })
              .catch(error => {
                console.error('Error checking if server is running:', error);
                reject(error);
              });
          }, 3000);
        })
        .catch(error => {
          console.error('Error checking if server is running:', error);
          reject(error);
        });
    } catch (error) {
      console.error('Error starting Python server:', error);
      reject(error);
    }
  });
}

// Function to check if the Python server is running
async function checkServerRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:8000/health', (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    // Set a timeout
    req.setTimeout(2000, () => {
      req.abort();
      resolve(false);
    });
  });
}

// Function to get the Python executable path
function getPythonPath() {
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
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('Server launcher shutting down');
  server.close();
  process.exit(0);
});
