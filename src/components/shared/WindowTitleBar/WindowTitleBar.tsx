import React from 'react';
import IconButton from '../IconButton';
import './WindowTitleBar.css';

export interface WindowTitleBarProps {
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
        <IconButton 
          variant="minimize"
          title="Minimize" 
          onClick={(e?: React.MouseEvent) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            onMinimize();
          }}
        >
          <img src="/Minimize.png" alt="" />
        </IconButton>
        <IconButton 
          variant="maximize"
          title="Maximize" 
          onClick={(e?: React.MouseEvent) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            onMaximize();
          }}
        >
          <img src={isMaximized ? "/Restore.png" : "/Maximize.png"} alt="" />
        </IconButton>
        <IconButton 
          variant="close"
          title="Close" 
          onClick={(e?: React.MouseEvent) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            onClose();
          }}
        >
          <img src="/Exit.png" alt="" />
        </IconButton>
      </div>
    </div>
  );
};

export default WindowTitleBar;
