import { useState, useRef } from 'react';
import type { OpenWindow } from '../../types';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import type { MouseEvent } from 'react';

interface UsePaintWindowProps {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const usePaintWindow = ({ window: paintWindow, index, onBringToFront }: UsePaintWindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
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
    onBringToFront(paintWindow.id);
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

  return {
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
    handleMouseDown,
    iframeLoaded,
    setIframeLoaded,
  };
};
