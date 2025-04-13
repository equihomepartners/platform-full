# Underwriting System Development Guidelines

## Overview

This document provides guidelines for developing the Underwriting System. It covers coding standards, architecture principles, and best practices.

## Code Structure

The Underwriting System code is organized as follows:

```
src/systems/underwriting/
├── api/                # API service functions
├── components/         # React components
├── data/               # Data files and mock data
├── docs/               # Documentation
├── hooks/              # Custom React hooks
├── services/           # Service functions
├── store/              # State management
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
- Use TypeScript with React for type safety
- Follow the container/presentational component pattern
- Use React Context for state that needs to be shared between components
- Use custom hooks for reusable logic

### API

- Follow RESTful API design principles
- Use consistent naming conventions for endpoints
- Document all API endpoints
- Implement proper error handling
- Use TypeScript for type safety

### State Management

- Use React Context for global state
- Use Zustand for complex state management
- Keep state as close to where it's used as possible
- Avoid prop drilling by using context or state management libraries

## Development Workflow

### Feature Development

1. **Planning**: Define the feature requirements and design
2. **Implementation**: Implement the feature
3. **Testing**: Write tests for the feature
4. **Documentation**: Update documentation
5. **Code Review**: Submit for code review
6. **Deployment**: Deploy to staging environment
7. **QA**: Perform quality assurance testing
8. **Release**: Deploy to production environment

### Bug Fixes

1. **Reproduction**: Reproduce the bug
2. **Root Cause Analysis**: Identify the root cause
3. **Fix**: Implement the fix
4. **Testing**: Write tests to prevent regression
5. **Documentation**: Update documentation if necessary
6. **Code Review**: Submit for code review
7. **Deployment**: Deploy to staging environment
8. **QA**: Perform quality assurance testing
9. **Release**: Deploy to production environment

## Best Practices

### Performance

- Use React.memo for expensive components
- Use useMemo and useCallback for expensive calculations and callbacks
- Implement virtualization for long lists
- Optimize API calls with caching and batching
- Use code splitting to reduce bundle size

### Security

- Validate all user input
- Implement proper authentication and authorization
- Use HTTPS for all API calls
- Sanitize data before rendering
- Follow OWASP security guidelines

### Accessibility

- Use semantic HTML
- Implement keyboard navigation
- Add ARIA attributes where necessary
- Ensure sufficient color contrast
- Test with screen readers

### Testing

- Write unit tests for all components and functions
- Write integration tests for component interactions
- Write end-to-end tests for critical user flows
- Use mock data for testing
- Aim for high test coverage

## Documentation

- Document all components, functions, and types
- Keep documentation up-to-date
- Use JSDoc comments for code documentation
- Write clear and concise documentation
- Include examples where appropriate

## Integration with Other Systems

- Follow the API integration guidelines
- Use the provided API clients for integration
- Implement proper error handling for integration points
- Test integration points thoroughly
- Document integration points
