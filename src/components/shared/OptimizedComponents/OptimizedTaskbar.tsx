import { memo } from 'react';
import { Taskbar } from '../../Taskbar';

interface OptimizedTaskbarProps {
  openWindows: Array<{
    id: string;
    title: string;
    isMinimized: boolean;
    zIndex: number;
    tab: string;
  }>;
  onWindowClick: (windowId: string) => void;
  currentTime: string;
}

const OptimizedTaskbar = memo<OptimizedTaskbarProps>(({
  openWindows,
  onWindowClick,
  currentTime
}) => {
  return (
    <Taskbar
      openWindows={openWindows}
      onWindowClick={onWindowClick}
      onStartMenuToggle={() => {}}
      currentTime={currentTime}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.openWindows.length === nextProps.openWindows.length &&
    prevProps.currentTime === nextProps.currentTime
  );
});

OptimizedTaskbar.displayName = 'OptimizedTaskbar';

export default OptimizedTaskbar;