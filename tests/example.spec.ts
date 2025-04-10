import { test, expect } from '@playwright/test';

// Example test for the home page
test('homepage has correct title and navigation', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Expect the page to have the correct title
  await expect(page).toHaveTitle(/Equihome Platform/);
  
  // Expect the confidentiality screen to be visible
  await expect(page.getByText('Confidential Information')).toBeVisible();
  
  // Click the "I Agree" button (assuming there is one)
  await page.getByRole('button', { name: /I Agree/i }).click();
  
  // Expect to be redirected to the welcome page
  await expect(page).toHaveURL(/\/welcome/);
});

// Example test for authentication
test('user can sign in', async ({ page }) => {
  // Navigate to the login page (assuming there is one)
  await page.goto('/welcome');
  
  // Click on a sign-in button (assuming there is one)
  await page.getByRole('button', { name: /Sign In/i }).click();
  
  // Fill in the login form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  
  // Submit the form
  await page.getByRole('button', { name: /Submit/i }).click();
  
  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL(/\/platform-guide/);
  
  // Expect the user to be logged in
  await expect(page.getByText('Welcome')).toBeVisible();
});

// Example test for the CIO Dashboard
test('CIO Dashboard displays correctly', async ({ page }) => {
  // Navigate to the CIO Dashboard
  await page.goto('/cio');
  
  // Expect the dashboard title to be visible
  await expect(page.getByRole('heading', { name: /CIO Dashboard/i })).toBeVisible();
  
  // Expect key metrics to be present
  await expect(page.getByText('Fund Strategy')).toBeVisible();
  await expect(page.getByText('Performance Metrics')).toBeVisible();
  
  // Test interaction with a chart or widget
  await page.getByText('Technical Infrastructure').click();
  await expect(page.getByText('AI Architecture')).toBeVisible();
});
