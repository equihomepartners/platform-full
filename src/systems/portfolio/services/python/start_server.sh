#!/bin/bash

# Start the Python server for the Equihome Fund Simulator
# This script is called from the frontend to start the server automatically

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Python is installed
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python not found. Please install Python 3.6 or higher."
    exit 1
fi

# Check if requirements.txt exists
if [ -f "$SCRIPT_DIR/requirements.txt" ]; then
    # Check if required packages are installed
    echo "Checking required packages..."
    $PYTHON_CMD -m pip install -r "$SCRIPT_DIR/requirements.txt"
else
    # Install basic required packages
    echo "Installing basic required packages..."
    $PYTHON_CMD -m pip install fastapi uvicorn pydantic
fi

# Navigate to the Python directory
cd "$SCRIPT_DIR"

# Start the server
echo "Starting Python server..."
$PYTHON_CMD api.py
