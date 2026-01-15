import { useState } from 'react';
import type { OpenWindow } from '../../types';
import { useDraggable } from '../../hooks/useDraggable';
import type { MouseEvent } from 'react';

interface UsePortfolioWindowProps {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const usePortfolioWindow = ({ window, index, onBringToFront }: UsePortfolioWindowProps) => {
  const [activeTab] = useState(window.tab);
  const [isMaximized, setIsMaximized] = useState(false);

  const offsetX = 40 + index * 30;
  const offsetY = 60 + index * 30;

  const { position, handleMouseDown: dragMouseDown } = useDraggable({
    initialX: offsetX,
    initialY: offsetY,
    disabled: isMaximized,
  });

  const handleMouseDown = (e: MouseEvent) => {
    onBringToFront(window.id);
    dragMouseDown(e);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const restore = () => {
    // Restore apenas maximização, não minimização
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
    handleMaximize,
    restore,
    getWindowIcon,
    handleMouseDown,
  };
};
