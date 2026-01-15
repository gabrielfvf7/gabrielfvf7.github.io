import { useState, useEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableProps {
  initialX: number;
  initialY: number;
  disabled?: boolean;
}

export const useDraggable = ({ initialX, initialY, disabled = false }: UseDraggableProps) => {
  const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef<Position>({ x: 0, y: 0 });
  const elementStartPos = useRef<Position>({ x: initialX, y: initialY });

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (disabled) return;
    
    // Apenas permitir arrastar pela área específica (será verificado pelo className)
    const target = e.target as HTMLElement;
    if (!target.closest('.window-title-bar')) return;

    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = position;
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      setPosition({
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {
    position,
    handleMouseDown,
    isDragging,
  };
};
