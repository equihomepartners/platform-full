# Equihome Simulation API

This is the backend API for the Equihome Portfolio Simulation Engine. It provides endpoints for fund settings, portfolio generation, simulation, and financial calculations.

## Overview

The Simulation API is built with FastAPI and provides a RESTful interface for the Portfolio Simulation Engine. It handles complex financial calculations, portfolio generation, and simulation.

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the API:

```bash
uvicorn app:app --reload
```

The API will be available at http://localhost:5000.

## API Documentation

Once the API is running, you can access the Swagger documentation at http://localhost:5000/docs.

### Endpoints

#### Fund Settings

- `GET /api/simulation/fund-settings`: Get fund settings
- `POST /api/simulation/fund-settings`: Save fund settings

#### Portfolio Generation

- `POST /api/simulation/generate-portfolio`: Generate portfolio based on settings
- `GET /api/simulation/portfolio`: Get generated portfolio

#### Simulation

- `POST /api/simulation/run`: Run simulation with portfolio and TFS data
- `GET /api/simulation/results`: Get simulation results

#### TFS Integration

- `POST /api/simulation/tfs-integration`: Integrate TFS data into simulation

#### Financial Calculations

- `POST /api/simulation/calculate-metrics`: Calculate fund metrics
- `POST /api/simulation/calculate-waterfall`: Calculate waterfall distribution

## Architecture

The Simulation API is organized into the following components:

### Models

- `fund_settings.py`: Fund settings data model
- `portfolio.py`: Portfolio data model
- `simulation.py`: Simulation data model

### Services

- `math_utils.py`: Financial calculation utilities
- `portfolio_gen.py`: Portfolio generation logic
- `waterfall.py`: Waterfall distribution calculations

## Integration with Frontend

The Simulation API is designed to be integrated with the React frontend. The frontend communicates with the API using the `simulationApiClient.ts` module.

## Error Handling

The API includes robust error handling to ensure reliable operation:

1. **Input Validation**: All input parameters are validated using Pydantic models.
2. **Error Responses**: Errors are returned with appropriate HTTP status codes and detailed error messages.
3. **Exception Handling**: Exceptions are caught and handled gracefully.

## Performance Considerations

The API is designed for high performance:

1. **Asynchronous Processing**: FastAPI's asynchronous capabilities are used for improved performance.
2. **Efficient Algorithms**: Efficient algorithms are used for financial calculations.
3. **Caching**: Results are cached to avoid redundant calculations.

## Security Considerations

In a production environment, the API should include the following security measures:

1. **Authentication**: API endpoints should require authentication.
2. **Authorization**: Access to sensitive data should be restricted based on user roles.
3. **Input Sanitization**: All user input should be sanitized to prevent injection attacks.
4. **CORS**: CORS should be configured to allow only trusted origins.

## Development

### Running Tests

```bash
pytest
```

### Code Style

The codebase follows PEP 8 style guidelines. You can check the code style using:

```bash
flake8
```

## Deployment

For production deployment, consider the following:

1. **Docker**: Containerize the API for easy deployment.
2. **HTTPS**: Use HTTPS for secure communication.
3. **Rate Limiting**: Implement rate limiting to prevent abuse.
4. **Monitoring**: Set up monitoring and logging.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
