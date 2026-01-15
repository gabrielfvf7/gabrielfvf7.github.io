import React from 'react';

interface WindowTitleBarProps {
  icon: string;
  title: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  icon,
  title,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  return (
    <div className="window-title-bar">
      <img src={icon} alt="" className="window-icon" />
      <div className="window-title">{title}</div>
      <div className="window-controls">
        <button 
          aria-label="Minimize" 
          className="window-control-btn minimize-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMinimize();
          }}
        >
          <img src="/Minimize.png" alt="" />
        </button>
        <button 
          aria-label="Maximize" 
          className="window-control-btn maximize-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMaximize();
          }}
        >
          <img src={isMaximized ? "/Restore.png" : "/Maximize.png"} alt="" />
        </button>
        <button 
          aria-label="Close" 
          className="window-control-btn close-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <img src="/Exit.png" alt="" />
        </button>
      </div>
    </div>
  );
};
