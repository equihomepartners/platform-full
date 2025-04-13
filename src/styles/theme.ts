/**
 * Equihome Platform Theme Utilities
 *
 * This file provides utility functions for applying the theme consistently.
 */

import { colors } from './colors';

// Button variants - more subtle, professional look
export const buttonVariants = {
  primary: `bg-primary-500 hover:bg-primary-600 text-white shadow-sm`,
  secondary: `bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm`,
  outline: `border border-primary-500 text-primary-500 hover:bg-primary-50 shadow-sm`,
  ghost: `text-primary-500 hover:bg-primary-50`,
  danger: `bg-accent-500 hover:bg-accent-600 text-white shadow-sm`,
  subtle: `bg-neutral-100 hover:bg-neutral-200 text-neutral-700 shadow-sm`,
};

// Card variants - more refined, professional look
export const cardVariants = {
  default: `bg-white border border-neutral-200 rounded-md shadow-sm`,
  elevated: `bg-white border border-neutral-200 rounded-md shadow-md`,
  flat: `bg-white rounded-md`,
  panel: `bg-white border border-neutral-200 rounded-md shadow-sm p-6`,
};

// Badge variants - more subtle, professional look
export const badgeVariants = {
  primary: `bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-sm font-medium`,
  secondary: `bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-sm font-medium`,
  success: `bg-success bg-opacity-10 text-success text-xs px-2 py-1 rounded-sm font-medium`,
  warning: `bg-warning bg-opacity-10 text-warning text-xs px-2 py-1 rounded-sm font-medium`,
  danger: `bg-error bg-opacity-10 text-error text-xs px-2 py-1 rounded-sm font-medium`,
  neutral: `bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-sm font-medium`,
};

// Zone badge variants (for Traffic Light System) - more subtle, professional look
export const zoneBadgeVariants = {
  green: `bg-success bg-opacity-10 text-success text-xs px-2 py-1 rounded-sm font-medium`,
  yellow: `bg-warning bg-opacity-10 text-warning text-xs px-2 py-1 rounded-sm font-medium`,
  red: `bg-error bg-opacity-10 text-error text-xs px-2 py-1 rounded-sm font-medium`,
};

// Progress bar variants - more subtle, professional look
export const progressVariants = {
  primary: `bg-primary-500`,
  secondary: `bg-secondary-500`,
  success: `bg-success`,
  warning: `bg-warning`,
  danger: `bg-error`,
  neutral: `bg-neutral-400`,
};

// Get color by zone
export const getZoneColor = (zone: string) => {
  switch (zone.toLowerCase()) {
    case 'green':
      return colors.zone.green;
    case 'yellow':
      return colors.zone.yellow;
    case 'red':
      return colors.zone.red;
    default:
      return colors.neutral[500];
  }
};

// Get badge variant by zone
export const getZoneBadgeVariant = (zone: string) => {
  switch (zone.toLowerCase()) {
    case 'green':
      return zoneBadgeVariants.green;
    case 'yellow':
      return zoneBadgeVariants.yellow;
    case 'red':
      return zoneBadgeVariants.red;
    default:
      return badgeVariants.neutral;
  }
};

export default {
  colors,
  buttonVariants,
  cardVariants,
  badgeVariants,
  zoneBadgeVariants,
  progressVariants,
  getZoneColor,
  getZoneBadgeVariant,
};
