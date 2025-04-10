import { test as setup, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Setup authentication for tests
setup('authenticate', async ({ page }) => {
  // Try to use existing auth if available
  const authFile = '.auth/user.json';
  
  try {
    // Try to sign in with test credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });
    
    if (error) {
      console.error('Authentication error:', error.message);
      // If the user doesn't exist, try to create one
      if (error.message.includes('Invalid login credentials')) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: 'test@example.com',
          password: 'password123',
        });
        
        if (signUpError) {
          console.error('Failed to create test user:', signUpError.message);
          return;
        }
        
        console.log('Created test user for Playwright tests');
      }
    }
    
    // Navigate to the app
    await page.goto('/');
    
    // If there's a confidentiality screen, accept it
    const agreeButton = page.getByRole('button', { name: /I Agree/i });
    if (await agreeButton.isVisible()) {
      await agreeButton.click();
    }
    
    // Navigate to login
    await page.goto('/welcome');
    
    // Fill in login form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /Submit/i }).click();
    
    // Wait for login to complete
    await page.waitForURL(/\/platform-guide/);
    
    // Save authentication state
    await page.context().storageState({ path: authFile });
  } catch (error) {
    console.error('Setup failed:', error);
  }
});
