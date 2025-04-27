import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ text, className = '' }) => {
  if (!text) {
    return <hr className={`border-t border-gray-300 my-4 ${className}`} />;
  }

  return (
    <div className={`flex items-center my-4 ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink px-3 text-gray-500 text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Divider;