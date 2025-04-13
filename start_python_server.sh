#!/bin/bash

# Simple script to start the Python server for the Equihome Fund Simulator

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Navigate to the Python directory
cd "$SCRIPT_DIR/src/systems/portfolio/services/python"

# Check if Python is installed
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python not found. Please install Python 3.6 or higher."
    exit 1
fi

# Check if required packages are installed
$PYTHON_CMD -c "import fastapi, uvicorn" &>/dev/null
if [ $? -ne 0 ]; then
    echo "Installing required packages..."
    $PYTHON_CMD -m pip install fastapi uvicorn
fi

# Start the Python server
echo "Starting Python server..."
$PYTHON_CMD api.py
