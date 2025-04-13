import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'default':
          return 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm';
        case 'primary':
          return 'bg-blue-700 text-white hover:bg-blue-800 shadow-sm';
        case 'destructive':
          return 'bg-red-600 text-white hover:bg-red-700 shadow-sm';
        case 'outline':
          return 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
        case 'secondary':
          return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        case 'ghost':
          return 'text-gray-700 hover:bg-gray-100';
        case 'link':
          return 'text-blue-600 underline-offset-4 hover:underline';
        default:
          return 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'default':
          return 'h-10 px-4 py-2 text-sm';
        case 'sm':
          return 'h-8 rounded-md px-3 text-xs';
        case 'lg':
          return 'h-12 rounded-md px-8 text-base';
        case 'icon':
          return 'h-10 w-10';
        default:
          return 'h-10 px-4 py-2 text-sm';
      }
    };

    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variantClasses = getVariantClasses();
    const sizeClasses = getSizeClasses();
    const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`;

    return (
      <button
        className={allClasses}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
