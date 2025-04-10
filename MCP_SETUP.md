# Setting Up Model Context Protocol (MCP) for Equihome Platform

This guide explains how to set up and use Supabase MCP and Playwright MCP with Augment for the Equihome Platform project.

## Supabase MCP Setup

### 1. Prerequisites

- Supabase project created at [https://supabase.com](https://supabase.com)
- Supabase URL and anon key from your project settings
- Supabase VS Code extension installed

### 2. Configuration Steps

1. **Connect Supabase to your project**:
   - Open your `.env` file and add your Supabase URL and anon key:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

2. **Configure Supabase VS Code Extension**:
   - Open VS Code settings
   - Search for "Supabase"
   - Add your Supabase URL and service key
   - Enable "Database Schema Understanding"

3. **Connect Augment to Supabase MCP**:
   - Open Augment settings
   - Navigate to "Model Context Protocol" section
   - Add Supabase as a context provider
   - Enter your Supabase project details
   - Enable "Database Schema Understanding"
   - Save the configuration

### 3. Using Supabase MCP with Augment

Once configured, Augment will have access to:

- Your Supabase database schema
- Table relationships
- Data types and constraints
- Authentication flows

This allows Augment to provide more accurate assistance when:
- Writing database queries
- Creating data models
- Implementing authentication
- Setting up real-time subscriptions

## Playwright MCP Setup

### 1. Prerequisites

- Playwright installed in your project
- Playwright VS Code extension installed
- Basic test files created

### 2. Configuration Steps

1. **Connect Playwright to your project**:
   - Ensure your `playwright.config.ts` file is properly configured
   - Set up test directories and base URL

2. **Configure Playwright VS Code Extension**:
   - Open VS Code settings
   - Search for "Playwright"
   - Set test directory path
   - Enable "Test Explorer" and "Test Generation"

3. **Connect Augment to Playwright MCP**:
   - Open Augment settings
   - Navigate to "Model Context Protocol" section
   - Add Playwright as a context provider
   - Set test directory path
   - Enable "Test Generation" and "Visual Testing"
   - Save the configuration

### 3. Using Playwright MCP with Augment

Once configured, Augment will have access to:

- Your test structure and patterns
- Page objects and components
- Test assertions and expectations
- Browser configurations

This allows Augment to provide more accurate assistance when:
- Writing end-to-end tests
- Creating test fixtures
- Implementing visual testing
- Debugging test failures

## Running Tests with Playwright MCP

To run tests with Playwright MCP:

1. **Generate tests**:
   ```
   npx playwright codegen http://localhost:5173
   ```

2. **Run tests**:
   ```
   npx playwright test
   ```

3. **View test reports**:
   ```
   npx playwright show-report
   ```

## Using GitHub Actions with MCP

The GitHub Actions workflows we've set up will:

1. Run Playwright tests on push and pull requests
2. Check code quality with linting and type checking
3. Deploy the application when changes are merged to main

These workflows complement the MCP setup by providing automated testing and deployment in the cloud.

## Troubleshooting

If you encounter issues with MCP:

1. **Supabase MCP**:
   - Verify your Supabase URL and keys
   - Check that your database schema is properly defined
   - Ensure row-level security policies are correctly set up

2. **Playwright MCP**:
   - Check that Playwright is properly installed
   - Verify your test files follow the correct structure
   - Ensure your application is running when tests are executed
