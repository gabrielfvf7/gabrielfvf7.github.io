import React from 'react';
import type { OpenWindow } from '../../types';
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
        {openWindows.map((window) => {
          const getWindowIcon = () => {
            switch(window.tab) {
              case 'about': return '/icons/User Accounts.png';
              case 'projects': return '/icons/Freecell.png';
              case 'experience': return '/icons/Scheduled Tasks.png';
              case 'skills': return '/icons/System Information.png';
              case 'minesweeper': return '/icons/Minesweeper.png';
              default: return '/icons/Default.png';
            }
          };

          return (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className="window-button"
              title={window.title}
            >
              <img src={getWindowIcon()} alt="" className="window-button-icon" />
              {window.title}
            </button>
          );
        })}
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
