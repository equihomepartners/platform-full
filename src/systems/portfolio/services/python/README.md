# Equihome Simulation Calculator - Python Backend

This directory contains the Python implementation of the Equihome simulation calculator. It provides more advanced financial calculations than the JavaScript version, particularly for complex operations like IRR calculation, Monte Carlo simulations, and optimization algorithms.

## Automatic Server Startup

The Python server will automatically be checked when you open the Simulation tab in the Portfolio Management System. If the server is not running, you'll see instructions on how to start it.

## Manual Setup

If you prefer to set up the server manually:

1. Install Python 3.8 or higher
2. Create a virtual environment:

```bash
cd src/systems/portfolio/services
python3 -m venv venv
```

3. Activate the virtual environment:

```bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

4. Install the required packages:

```bash
pip install -r python/requirements.txt
```

5. Start the API server:

```bash
cd python
python api.py
```

## Using the Start Script

For convenience, a start script is provided that handles all the setup steps:

```bash
# Make the script executable (if needed)
chmod +x src/systems/portfolio/services/python/start_server.sh

# Run the script
src/systems/portfolio/services/python/start_server.sh
```

This will start a FastAPI server on port 8000. You can access the API documentation at http://localhost:8000/docs.

## API Endpoints

- `POST /api/simulation/run`: Run a full simulation with the given parameters
- `POST /api/simulation/loan-exit-value`: Calculate the exit value of a loan
- `POST /api/simulation/waterfall`: Calculate the waterfall distribution
- `POST /api/simulation/irr`: Calculate the internal rate of return (IRR) for a series of cash flows

## Integration with Frontend

The frontend automatically detects if the Python API is available and uses it for calculations. If the Python API is not available, it falls back to the JavaScript implementation.

Example:

```javascript
// Run a simulation
const response = await fetch('http://localhost:8000/api/simulation/run', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fund_size: 100000000,
    fund_term: 10,
    simple_interest_rate: 0.05,
    // ... other parameters
  }),
});

const result = await response.json();
```

## Testing

You can test the calculator directly by running:

```bash
python simulation_calculator.py
```

This will run a test simulation with default parameters and print the results.
