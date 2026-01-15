import React, { memo } from 'react';
import { Taskbar } from '../../Taskbar';

interface OptimizedTaskbarProps {
  openWindows: Array<{
    id: string;
    title: string;
    isMinimized: boolean;
    zIndex: number;
  }>;
  onWindowClick: (windowId: string) => void;
  onStartMenuClick: () => void;
  startMenuOpen: boolean;
  currentTime: Date;
  onThemeToggle: () => void;
  theme: string;
}

const OptimizedTaskbar = memo<OptimizedTaskbarProps>(({
  openWindows,
  onWindowClick,
  onStartMenuClick,
  startMenuOpen,
  currentTime,
  onThemeToggle,
  theme
}) => {
  return (
    <Taskbar
      openWindows={openWindows}
      onWindowClick={onWindowClick}
      onStartMenuClick={onStartMenuClick}
      startMenuOpen={startMenuOpen}
      currentTime={currentTime}
      onThemeToggle={onThemeToggle}
      theme={theme}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.openWindows.length === nextProps.openWindows.length &&
    prevProps.startMenuOpen === nextProps.startMenuOpen &&
    prevProps.theme === nextProps.theme &&
    prevProps.currentTime.getMinutes() === nextProps.currentTime.getMinutes()
  );
});

OptimizedTaskbar.displayName = 'OptimizedTaskbar';

export default OptimizedTaskbar;