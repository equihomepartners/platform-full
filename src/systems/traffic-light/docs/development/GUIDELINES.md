# Traffic Light System Development Guidelines

This document provides guidelines for developing the Traffic Light System.

## Development Environment

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/equihomepartners/platform-full.git
   ```

2. Install dependencies:
   ```bash
   cd platform-full
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Code Structure

The Traffic Light System code is organized as follows:

```
src/systems/traffic-light/
├── api/                # API service functions
├── components/         # React components
├── context/            # React context providers
├── docs/               # Documentation
├── hooks/              # Custom React hooks
├── services/           # Service functions
├── types/              # TypeScript types
├── utils/              # Utility functions
└── README.md           # Main README
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use type annotations for function parameters and return values
- Avoid using `any` type

### React

- Use functional components with hooks
- Use React context for state management
- Use custom hooks for reusable logic
- Use TypeScript interfaces for component props

### CSS

- Use Tailwind CSS for styling
- Use CSS modules for component-specific styles
- Follow the BEM (Block Element Modifier) naming convention

## Git Workflow

### Branches

- `main`: Production branch
- `develop`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `release/*`: Release branches

### Commit Messages

Follow the conventional commits format:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(map): Add suburb classification colors
```

### Pull Requests

- Create a pull request for each feature or bug fix
- Request reviews from at least one team member
- Ensure all tests pass before merging
- Squash commits when merging

## Testing

### Unit Tests

- Write unit tests for all new code
- Use Jest for testing
- Use React Testing Library for component tests
- Aim for at least 80% code coverage

### Integration Tests

- Write integration tests for API services
- Use Playwright for end-to-end tests
- Test all critical user flows

## Documentation

### Code Documentation

- Document all functions, classes, and interfaces
- Use JSDoc comments for documentation
- Document complex logic with inline comments

### API Documentation

- Document all API endpoints
- Include request and response formats
- Document error responses

### User Documentation

- Document all user-facing features
- Include screenshots and examples
- Keep documentation up-to-date with code changes

## Performance

### Frontend Performance

- Use React.memo for expensive components
- Use useMemo and useCallback hooks for memoization
- Optimize bundle size with code splitting
- Use lazy loading for components

### API Performance

- Use caching for expensive operations
- Implement pagination for large datasets
- Use query parameters for filtering and sorting
- Implement rate limiting for API endpoints

## Accessibility

- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers

## Security

- Validate all user input
- Use HTTPS for all API requests
- Implement proper authentication and authorization
- Protect against common web vulnerabilities (XSS, CSRF, etc.)
- Keep dependencies up-to-date

## Deployment

- Use CI/CD for automated deployments
- Run tests before deployment
- Use feature flags for new features
- Implement rollback procedures
- Monitor application performance and errors
