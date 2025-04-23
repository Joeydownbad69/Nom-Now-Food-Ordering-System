import React from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className = '' }) => {
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

export default Divider;