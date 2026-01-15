import React from 'react';
import type { OpenWindow } from '../../types';
import { useTaskbar } from './useTaskbar';
import './Taskbar.css';

interface TaskbarProps {
  onStartMenuToggle: () => void;
  openWindows: OpenWindow[];
  onWindowClick: (id: string) => void;
  currentTime: string;
}

export const Taskbar: React.FC<TaskbarProps> = ({ 
  onStartMenuToggle, 
  openWindows, 
  onWindowClick, 
  currentTime 
}) => {
  const { getWindowIcon } = useTaskbar();

  return (
    <div className="taskbar">
      {/* Start Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStartMenuToggle();
        }}
        className="start-button"
        aria-label="Iniciar"
      >
      </button>

      {/* Window Buttons */}
      <div className="window-buttons-container">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className="window-button"
            title={window.title}
          >
            <img src={getWindowIcon(window)} alt="" className="window-button-icon" />
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray / Time */}
      <div className="system-tray">
        <div className="system-tray-time">
          {currentTime}
        </div>
      </div>
    </div>
  );
};
