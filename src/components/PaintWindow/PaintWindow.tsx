import { useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import type { OpenWindow } from '../../types';
import { usePaintWindow } from './usePaintWindow';
import { ResizeHandles } from '../ResizeHandles';
import './PaintWindow.css';

interface PaintWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string) => void;
}

export interface PaintWindowRef {
  restore: () => void;
}

export const PaintWindow = forwardRef<PaintWindowRef, PaintWindowProps>(
  ({ window: paintWindow, index, onClose, onBringToFront, onMinimize }, ref) => {
    const {
      isMaximized,
      positionX,
      positionY,
      width,
      height,
      windowRef,
      isResizing,
      handleMaximize,
      handleResizeStart,
      restore,
      handleMouseDown,
      iframeLoaded,
      setIframeLoaded,
    } = usePaintWindow({ window: paintWindow, index, onBringToFront });

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useImperativeHandle(ref, () => ({ restore }));

    useEffect(() => {
      if (iframeLoaded && iframeRef.current?.contentWindow) {
        const contentWindow = iframeRef.current.contentWindow;
        
        // Aplicar tema clássico do JSPaint se disponível
        setTimeout(() => {
          try {
            if ('set_theme' in contentWindow && typeof contentWindow.set_theme === 'function') {
              (contentWindow.set_theme as (theme: string) => void)("classic.css");
            }
          } catch {
            console.log('JSPaint ainda carregando...');
          }
        }, 100);
      }
    }, [iframeLoaded]);

    return (
      <div 
        ref={windowRef}
        className={`paint-window ${paintWindow.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isResizing ? 'resizing' : ''}`}
        style={{ 
          left: isMaximized ? '0px' : `${positionX}px`,
          top: isMaximized ? '0px' : `${positionY}px`,
          width: isMaximized ? '100vw' : `${width}px`,
          height: isMaximized ? 'calc(100vh - 40px)' : `${height}px`,
          zIndex: paintWindow.zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Title Bar */}
        <div className="window-title-bar">
          <img src="/icons/Paint.png" alt="" className="window-icon" />
          <div className="window-title">Paint</div>
          <div className="window-controls">
            <button 
              aria-label="Minimize" 
              className="window-control-btn minimize-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMinimize(paintWindow.id);
              }}
            >
              <img src="/Minimize.png" alt="" />
            </button>
            <button 
              aria-label="Maximize" 
              className="window-control-btn maximize-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMaximize();
              }}
            >
              <img src={isMaximized ? "/Restore.png" : "/Maximize.png"} alt="" />
            </button>
            <button 
              aria-label="Close" 
              className="window-control-btn close-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose(paintWindow.id);
              }}
            >
              <img src="/Exit.png" alt="" />
            </button>
          </div>
        </div>

        {/* Paint Content */}
        <div className="paint-content">
          <iframe
            ref={iframeRef}
            src="/jspaint/index.html"
            title="Paint"
            className="paint-iframe"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {!isMaximized && <ResizeHandles onResizeStart={handleResizeStart} windowRef={windowRef as React.RefObject<HTMLDivElement>} />}
      </div>
    );
});

PaintWindow.displayName = 'PaintWindow';
