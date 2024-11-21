import React, { forwardRef, InputHTMLAttributes } from 'react';
import { formatNumber, parseFormattedNumber } from '../../lib/formatters';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  formatNumber?: boolean;
  onChange?: (value: number | string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, formatNumber: shouldFormat, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      if (shouldFormat && type === 'number') {
        // Remove commas and convert to number
        const rawValue = e.target.value.replace(/,/g, '');
        const numericValue = parseFloat(rawValue);
        if (!isNaN(numericValue)) {
          onChange(numericValue);
        }
      } else {
        onChange(e.target.value);
      }
    };

    // Format the display value if it's a number and formatting is enabled
    const displayValue = shouldFormat && typeof value === 'number' 
      ? formatNumber(value)
      : value;

    return (
      <input
        type={shouldFormat ? 'text' : type}
        className={className}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;