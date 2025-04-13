import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="/logo.svg"
        alt="Equihome Partners Logo"
        className="h-10 w-10 flex-shrink-0"
      />
      <span className="text-xl font-semibold text-primary-700">
        Equihome Partners
      </span>
    </div>
  );
};

export default Logo;