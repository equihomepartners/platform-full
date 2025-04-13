/**
 * Format a number with commas as thousands separators
 * 
 * @param value Number to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format a number as currency
 * 
 * @param value Number to format
 * @param minimumFractionDigits Minimum fraction digits (default: 0)
 * @param maximumFractionDigits Maximum fraction digits (default: 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};

/**
 * Format a number as percentage
 * 
 * @param value Number to format (e.g., 0.05 for 5%)
 * @param minimumFractionDigits Minimum fraction digits (default: 2)
 * @param maximumFractionDigits Maximum fraction digits (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};
