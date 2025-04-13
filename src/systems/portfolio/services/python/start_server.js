/**
 * Start Python Server Script
 * 
 * This script starts the Python server for the simulation calculator.
 * It is called by the PythonServerManager component when the simulation tab is opened.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the path to the Python executable in the virtual environment
const pythonPath = path.join(__dirname, 'venv', 'bin', 'python');
const apiScriptPath = path.join(__dirname, 'api.py');

// Check if the Python executable exists
if (!fs.existsSync(pythonPath)) {
  console.error(`Python executable not found at ${pythonPath}`);
  process.exit(1);
}

// Check if the API script exists
if (!fs.existsSync(apiScriptPath)) {
  console.error(`API script not found at ${apiScriptPath}`);
  process.exit(1);
}

// Start the Python server
console.log('Starting Python server...');
const pythonProcess = spawn(pythonPath, [apiScriptPath], {
  cwd: __dirname,
  stdio: 'inherit'
});

// Handle process events
pythonProcess.on('error', (error) => {
  console.error('Failed to start Python server:', error);
  process.exit(1);
});

pythonProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Python server exited with code ${code} and signal ${signal}`);
    process.exit(1);
  }
  console.log('Python server stopped');
});

// Handle SIGINT (Ctrl+C) to gracefully shut down the Python server
process.on('SIGINT', () => {
  console.log('Stopping Python server...');
  pythonProcess.kill('SIGINT');
  process.exit(0);
});

console.log('Python server started successfully');
