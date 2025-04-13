/**
 * Equihome Platform Color Palette - Institutional Grade
 *
 * This file defines the professional color palette for the Equihome platform.
 * Use these color variables throughout the application for consistent branding.
 */

export const colors = {
  // Primary colors - subdued blue tones
  primary: {
    50: '#f5f7fa',
    100: '#ebeef5',
    200: '#d8deeb',
    300: '#b6c2db',
    400: '#8c9fc3',
    500: '#6b81ad', // Main primary color
    600: '#526896',
    700: '#41547b',
    800: '#344263',
    900: '#2a3552',
    950: '#1a2035',
  },

  // Secondary colors - subtle teal tones
  secondary: {
    50: '#f2f9f9',
    100: '#e6f3f3',
    200: '#c7e4e4',
    300: '#a3d1d1',
    400: '#75b7b7',
    500: '#5a9e9e', // Main secondary color
    600: '#4a8080',
    700: '#3d6868',
    800: '#345656',
    900: '#2d4848',
    950: '#1a2c2c',
  },

  // Accent colors - restrained red tones
  accent: {
    50: '#fdf5f5',
    100: '#f9e6e6',
    200: '#f2d1d1',
    300: '#e7b1b1',
    400: '#d78a8a',
    500: '#c76b6b', // Main accent color
    600: '#b15151',
    700: '#944141',
    800: '#7a3838',
    900: '#653232',
    950: '#3a1d1d',
  },

  // Neutral colors - professional grays
  neutral: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
    950: '#121416',
  },

  // Success, warning, error colors - subdued
  success: '#3b7861',
  warning: '#8f6e3b',
  error: '#a14545',

  // Zone colors (for Traffic Light System) - subdued
  zone: {
    green: '#3b7861',
    yellow: '#8f6e3b',
    red: '#a14545',
  },

  // Chart colors - professional palette
  chart: [
    '#6b81ad', // primary
    '#5a9e9e', // secondary
    '#8f6e3b', // warning
    '#6c757d', // gray
    '#4b6584', // dark blue
    '#778ca3', // light blue
    '#a5b1c2', // pale blue
    '#d1d8e0', // very light blue
    '#8395a7', // slate
    '#c8d6e5', // light slate
  ],
};

// Aliases for backward compatibility
export const primaryColor = colors.primary[500];
export const secondaryColor = colors.secondary[500];
export const accentColor = colors.accent[500];

export default colors;
