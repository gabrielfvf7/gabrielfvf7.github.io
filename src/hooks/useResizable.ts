import { useState, useCallback, useRef, useEffect } from 'react';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseResizableProps {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export const useResizable = ({
  minWidth = 400,
  minHeight = 300,
  maxWidth = window.innerWidth - 100,
  maxHeight = window.innerHeight - 100,
  initialWidth = 800,
  initialHeight = 600,
}: UseResizableProps = {}) => {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const resizeDirectionRef = useRef<ResizeDirection | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });
  const elementPosRef = useRef({ x: 0, y: 0 });

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: ResizeDirection, elementRef: HTMLElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = elementRef.getBoundingClientRect();
    
    setIsResizing(true);
    resizeDirectionRef.current = direction;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = { width: size.width, height: size.height };
    elementPosRef.current = { x: rect.left, y: rect.top };
  }, [size]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      const direction = resizeDirectionRef.current;
      
      let newWidth = startSizeRef.current.width;
      let newHeight = startSizeRef.current.height;

      if (direction?.includes('e')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSizeRef.current.width + deltaX));
      }
      if (direction?.includes('w')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSizeRef.current.width - deltaX));
      }
      if (direction?.includes('s')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSizeRef.current.height + deltaY));
      }
      if (direction?.includes('n')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSizeRef.current.height - deltaY));
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeDirectionRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, minHeight, maxWidth, maxHeight]);

  const resetSize = useCallback(() => {
    setSize({ width: initialWidth, height: initialHeight });
  }, [initialWidth, initialHeight]);

  return {
    size,
    isResizing,
    handleResizeStart,
    resetSize,
  };
};
