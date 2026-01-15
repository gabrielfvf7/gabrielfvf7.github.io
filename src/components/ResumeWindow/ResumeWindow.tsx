import { useImperativeHandle, forwardRef } from 'react';
import type { OpenWindow } from '../../types';
import { useResumeWindow } from './useResumeWindow';
import WindowTitleBar from '../shared/WindowTitleBar';
import { ResizeHandles } from '../ResizeHandles';
import './ResumeWindow.css';

interface ResumeWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string) => void;
}

export interface ResumeWindowRef {
  restore: () => void;
}

export const ResumeWindow = forwardRef<ResumeWindowRef, ResumeWindowProps>(
  ({ window: resumeWindow, index, onClose, onBringToFront, onMinimize }, ref) => {
    const {
      isMaximized,
      windowRef,
      positionX,
      positionY,
      width,
      height,
      isResizing,
      handleMaximize,
      handleResizeStart,
      restore,
      handleMouseDown,
    } = useResumeWindow({ window: resumeWindow, index, onBringToFront });

    useImperativeHandle(ref, () => ({ restore }));

    return (
      <div 
        ref={windowRef}
        className={`resume-window ${resumeWindow.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isResizing ? 'resizing' : ''}`}
        style={{ 
          left: isMaximized ? '0px' : `${positionX}px`,
          top: isMaximized ? '0px' : `${positionY}px`,
          width: isMaximized ? '100vw' : `${width}px`,
          height: isMaximized ? 'calc(100vh - 30px)' : `${height}px`,
          zIndex: resumeWindow.zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        <WindowTitleBar
          icon="/icons/Notepad.png"
          title="Currículo - Gabriel Vargas.pdf"
          isMaximized={isMaximized}
          onMinimize={() => onMinimize(resumeWindow.id)}
          onMaximize={handleMaximize}
          onClose={() => onClose(resumeWindow.id)}
        />

        <div className="resume-content">
          <iframe
            src="/documents/resume.pdf"
            className="resume-iframe"
            title="Currículo Gabriel Vargas"
          />
        </div>

        {!isMaximized && (
          <ResizeHandles 
            onResizeStart={handleResizeStart} 
            windowRef={windowRef as React.RefObject<HTMLDivElement>} 
          />
        )}
      </div>
    );
  }
);

ResumeWindow.displayName = 'ResumeWindow';
