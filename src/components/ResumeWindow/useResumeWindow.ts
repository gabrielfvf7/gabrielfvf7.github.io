import { useState, useEffect, useRef } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import type { OpenWindow } from '../../types';
import type { MouseEvent } from 'react';

interface UseResumeWindowProps {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const useResumeWindow = ({ window: resumeWindow, index, onBringToFront }: UseResumeWindowProps) => {
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
    minWidth: 600,
    minHeight: 500,
  });

  const handleMouseDown = (e: MouseEvent) => {
    onBringToFront(resumeWindow.id);
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
    setIsMaximized(false);
    resetSize();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (windowRef.current && !windowRef.current.contains(target)) {
        return;
      }
    };

    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);

  return {
    isMaximized,
    windowRef,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height,
    isResizing,
    handleMaximize,
    handleResizeStart,
    restore,
    handleMouseDown,
  };
};