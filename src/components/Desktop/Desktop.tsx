import React from 'react';
import './Desktop.css';

interface DesktopContainerProps {
  children: React.ReactNode;
  onDesktopClick?: () => void;
}

export const DesktopContainer: React.FC<DesktopContainerProps> = ({ children, onDesktopClick }) => {
  return (
    <div className="desktop-container" onClick={onDesktopClick}>
      {children}
    </div>
  );
};
