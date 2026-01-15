import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  text = 'Carregando...' 
}: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="spinner-icon"></div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );
}

export default LoadingSpinner;
export type { LoadingSpinnerProps };