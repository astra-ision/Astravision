import React from 'react';
// If class-variance-authority is causing issues, use this simplified button instead
// Without cva dependency

export function Button({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  // Base classes
  let variantClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant classes
  switch (variant) {
    case 'default':
      variantClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500';
      break;
    case 'secondary':
      variantClasses += ' bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600';
      break;
    case 'outline':
      variantClasses += ' border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500 dark:border-gray-600 dark:hover:bg-gray-800';
      break;
    case 'destructive':
      variantClasses += ' bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500';
      break;
    case 'ghost':
      variantClasses += ' bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500 dark:hover:bg-gray-800';
      break;
    case 'link':
      variantClasses += ' text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500';
      break;
    default:
      variantClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500';
  }
  
  // Size classes
  switch (size) {
    case 'default':
      variantClasses += ' h-10 px-4 py-2';
      break;
    case 'sm':
      variantClasses += ' h-8 px-3 text-sm';
      break;
    case 'lg':
      variantClasses += ' h-12 px-6 text-lg';
      break;
    case 'icon':
      variantClasses += ' h-10 w-10';
      break;
    default:
      variantClasses += ' h-10 px-4 py-2';
  }
  
  // Full width
  if (fullWidth) {
    variantClasses += ' w-full';
  }
  
  // Additional classes
  variantClasses += ` ${className}`;
  
  return (
    <button
      className={`${variantClasses} ${isLoading ? 'relative !text-transparent' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="animate-spin h-5 w-5 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
}
