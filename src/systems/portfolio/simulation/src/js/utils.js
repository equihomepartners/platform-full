/**
 * Format a number with commas as thousands separators
 * @param {number|string} number - The number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted number string
 */
function formatNumberWithCommas(number, decimals = 0) {
  if (number === undefined || number === null) {
    return '0';
  }

  // If it's a string with commas already, parse it first
  if (typeof number === 'string') {
    number = parseNumberWithCommas(number);
  }

  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Parse a string with commas back to a number
 * @param {string} str - The string to parse
 * @returns {number} Parsed number
 */
function parseNumberWithCommas(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;

  return parseFloat(str.replace(/,/g, ''));
}

/**
 * Format a number as a percentage
 * @param {number} number - The number to format (e.g., 0.05 for 5%)
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
function formatPercentage(number, decimals = 2) {
  if (number === undefined || number === null) {
    return '0.00%';
  }

  return (number * 100).toFixed(decimals) + '%';
}

/**
 * Parse a percentage string back to a decimal number
 * @param {string} str - The percentage string to parse (e.g., "5%")
 * @returns {number} Parsed decimal number (e.g., 0.05)
 */
function parsePercentage(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;

  return parseFloat(str.replace('%', '')) / 100;
}

/**
 * Format a number as currency
 * @param {number} number - The number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted currency string
 */
function formatCurrency(number, decimals = 0) {
  if (number === undefined || number === null) {
    return '$0';
  }

  return '$' + formatNumberWithCommas(number, decimals);
}

/**
 * Parse a currency string back to a number
 * @param {string} str - The currency string to parse (e.g., "$1,000")
 * @returns {number} Parsed number
 */
function parseCurrency(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;

  return parseFloat(str.replace(/[$,]/g, ''));
}
