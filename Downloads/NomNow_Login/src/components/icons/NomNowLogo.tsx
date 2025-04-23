import React from 'react';

interface LogoProps {
  className?: string;
}

const NomNowLogo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="text-4xl font-bold tracking-tight text-orange-400">NT</div>
      <div className="text-lg font-semibold tracking-wide text-orange-400">NOMNOW</div>
    </div>
  );
};

export default NomNowLogo;