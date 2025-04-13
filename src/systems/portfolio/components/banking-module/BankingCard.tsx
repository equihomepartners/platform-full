import React from 'react';
import './theme.css';

interface BankingCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const BankingCard: React.FC<BankingCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`banking-card ${className}`}>
      {title && (
        <div className="banking-card-header">
          {title}
        </div>
      )}
      <div className="banking-card-body">
        {children}
      </div>
    </div>
  );
};

export default BankingCard;
