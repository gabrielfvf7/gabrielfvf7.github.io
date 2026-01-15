import React from 'react';
import './ResizeHandles.css';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface ResizeHandlesProps {
  onResizeStart: (e: React.MouseEvent, direction: ResizeDirection, element: HTMLElement) => void;
  windowRef: React.RefObject<HTMLDivElement>;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResizeStart, windowRef }) => {
  const handleMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
    if (windowRef.current) {
      onResizeStart(e, direction, windowRef.current);
    }
  };

  return (
    <>
      <div className="resize-handle resize-n" onMouseDown={(e) => handleMouseDown(e, 'n')} />
      <div className="resize-handle resize-s" onMouseDown={(e) => handleMouseDown(e, 's')} />
      <div className="resize-handle resize-e" onMouseDown={(e) => handleMouseDown(e, 'e')} />
      <div className="resize-handle resize-w" onMouseDown={(e) => handleMouseDown(e, 'w')} />
      <div className="resize-handle resize-ne" onMouseDown={(e) => handleMouseDown(e, 'ne')} />
      <div className="resize-handle resize-nw" onMouseDown={(e) => handleMouseDown(e, 'nw')} />
      <div className="resize-handle resize-se" onMouseDown={(e) => handleMouseDown(e, 'se')} />
      <div className="resize-handle resize-sw" onMouseDown={(e) => handleMouseDown(e, 'sw')} />
    </>
  );
};
