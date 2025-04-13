/**
 * Run Simulation Tests
 *
 * This script runs the tests for the simplified simulation calculator.
 * It uses Node.js to execute the tests directly without requiring a test framework.
 */

// Use dynamic import for ES modules
import('./simplifiedSimulationCalculator.test.ts').catch(error => {
  console.error('Error importing test file:', error);
});
