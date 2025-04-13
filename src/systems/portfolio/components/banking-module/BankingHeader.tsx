import React from 'react';
import { X, Maximize2, Minimize2, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import './theme.css';

interface BankingHeaderProps {
  title: string;
  subtitle?: string;
  isFullscreen: boolean;
  isPythonAvailable?: boolean;
  isCheckingPython?: boolean;
  onToggleFullscreen: () => void;
  onClose?: () => void;
}

const BankingHeader: React.FC<BankingHeaderProps> = ({
  title,
  subtitle,
  isFullscreen,
  isPythonAvailable,
  isCheckingPython,
  onToggleFullscreen,
  onClose
}) => {
  return (
    <div className="banking-header banking-flex banking-justify-between banking-items-center">
      <div>
        <h1 className="banking-text-xl banking-font-bold">{title}</h1>
        {subtitle && <p className="banking-text-sm banking-opacity-80">{subtitle}</p>}
      </div>
      
      <div className="banking-flex banking-items-center">
        {/* Python Status */}
        {typeof isPythonAvailable !== 'undefined' && (
          <div className="banking-mr-4">
            {isCheckingPython ? (
              <div className="banking-status banking-status-info">
                <Server className="banking-mr-1" size={14} />
                <span>Checking API...</span>
              </div>
            ) : isPythonAvailable ? (
              <div className="banking-status banking-status-success">
                <CheckCircle className="banking-mr-1" size={14} />
                <span>Python Engine</span>
              </div>
            ) : (
              <div className="banking-status banking-status-warning">
                <AlertTriangle className="banking-mr-1" size={14} />
                <span>JavaScript Fallback</span>
              </div>
            )}
          </div>
        )}
        
        {/* Fullscreen Toggle */}
        <button 
          className="banking-button banking-button-outline banking-mr-2"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
        
        {/* Close Button (only in fullscreen) */}
        {isFullscreen && onClose && (
          <button 
            className="banking-button banking-button-outline banking-button-danger"
            onClick={onClose}
            title="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BankingHeader;
