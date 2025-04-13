import React from 'react';
import { Maximize2, Minimize2, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface SimulationHeaderProps {
  title: string;
  subtitle: string;
  isFullscreen: boolean;
  isPythonAvailable: boolean;
  isCheckingPython: boolean;
  onToggleFullscreen: () => void;
  onClose?: () => void;
}

const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  title,
  subtitle,
  isFullscreen,
  isPythonAvailable,
  isCheckingPython,
  onToggleFullscreen,
  onClose
}) => {
  return (
    <div className="banking-flex banking-justify-between banking-items-center banking-p-4 banking-bg-primary-900 banking-text-white">
      <div>
        <h2 className="banking-text-xl banking-font-semibold">{title}</h2>
        <p className="banking-text-sm banking-opacity-80">{subtitle}</p>
      </div>
      
      <div className="banking-flex banking-items-center banking-space-x-4">
        {/* Python API Status */}
        <div className="banking-flex banking-items-center banking-text-sm">
          {isCheckingPython ? (
            <>
              <Loader2 size={16} className="banking-animate-spin banking-mr-2" />
              <span>Checking Python API...</span>
            </>
          ) : isPythonAvailable ? (
            <>
              <CheckCircle size={16} className="banking-text-green-400 banking-mr-2" />
              <span>Python API Connected</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} className="banking-text-red-400 banking-mr-2" />
              <span>Python API Unavailable</span>
            </>
          )}
        </div>
        
        {/* Fullscreen Toggle */}
        <button
          className="banking-p-2 banking-rounded-full banking-hover:banking-bg-primary-800 banking-transition-colors"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
        
        {/* Close Button (only shown when onClose is provided) */}
        {onClose && (
          <button
            className="banking-p-2 banking-rounded-full banking-hover:banking-bg-primary-800 banking-transition-colors"
            onClick={onClose}
            title="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SimulationHeader;
