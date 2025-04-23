import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center py-2.5 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-orange-400 hover:bg-orange-500 text-black font-medium focus:ring-orange-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    facebook: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400',
    google: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 focus:ring-gray-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'facebook', 'google']),
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;