import { useState, useRef } from 'react';
import type { OpenWindow } from '../../types';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import type { MouseEvent } from 'react';

interface UsePortfolioWindowProps {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const usePortfolioWindow = ({ window, index, onBringToFront }: UsePortfolioWindowProps) => {
  const [activeTab] = useState(window.tab);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const offsetX = 40 + index * 30;
  const offsetY = 60 + index * 30;

  const { position, handleMouseDown: dragMouseDown } = useDraggable({
    initialX: offsetX,
    initialY: offsetY,
    disabled: isMaximized,
  });

  const { size, isResizing, handleResizeStart, resetSize } = useResizable({
    initialWidth: 800,
    initialHeight: 600,
  });

  const handleMouseDown = (e: MouseEvent) => {
    onBringToFront(window.id);
    dragMouseDown(e);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
      resetSize();
    }
  };

  const restore = () => {
    if (isMaximized) {
      setIsMaximized(false);
    }
  };

  const getWindowIcon = () => {
    switch(window.tab) {
      case 'about': return '/icons/User Accounts.png';
      case 'projects': return '/icons/Freecell.png';
      case 'experience': return '/icons/Scheduled Tasks.png';
      case 'skills': return '/icons/System Information.png';
      default: return '/icons/Default.png';
    }
  };

  return {
    activeTab,
    isMaximized,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height,
    windowRef,
    isResizing,
    handleMaximize,
    handleResizeStart,
    restore,
    getWindowIcon,
    handleMouseDown,
  };
};
