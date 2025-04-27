import React from 'react';
import PropTypes from 'prop-types';

const NomNowLogo = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="text-4xl font-bold tracking-tight text-orange-400">NT</div>
      <div className="text-lg font-semibold tracking-wide text-orange-400">NOMNOW</div>
    </div>
  );
};

NomNowLogo.propTypes = {
  className: PropTypes.string,
};

export default NomNowLogo;