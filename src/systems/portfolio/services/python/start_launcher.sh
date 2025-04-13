#!/bin/bash

# Start the server launcher for the Equihome Fund Simulator
# This script starts the Node.js server that can launch the Python server

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Node.js is installed
if command -v node &>/dev/null; then
    NODE_CMD="node"
else
    echo "Error: Node.js not found. Please install Node.js."
    exit 1
fi

# Start the server launcher in the background
echo "Starting server launcher..."
cd "$SCRIPT_DIR"
nohup $NODE_CMD server_launcher.js > server_launcher.log 2>&1 &

# Save the process ID
echo $! > server_launcher.pid

echo "Server launcher started with PID $(cat server_launcher.pid)"
