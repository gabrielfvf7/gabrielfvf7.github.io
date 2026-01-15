import { useImperativeHandle, forwardRef } from 'react';
import type { OpenWindow } from '../../types';
import { usePortfolioWindow } from './usePortfolioWindow';
import { WindowTitleBar } from '../shared/WindowTitleBar';
import { WindowMenuBar } from '../shared/WindowMenuBar';
import { ResizeHandles } from '../ResizeHandles';
import { AboutSection, ProjectsSection, SkillsSection, ExperienceSection } from './sections';
import './PortfolioWindow.css';

interface PortfolioWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string) => void;
}

export interface PortfolioWindowRef {
  restore: () => void;
}

export const PortfolioWindow = forwardRef<PortfolioWindowRef, PortfolioWindowProps>(
  ({ window, index, onClose, onBringToFront, onMinimize }, ref) => {
    const {
      activeTab,
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
      getWindowIcon,
      handleMouseDown,
    } = usePortfolioWindow({ window, index, onBringToFront });

    useImperativeHandle(ref, () => ({ restore }));

    const menuItems = ['Arquivo', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda'];

  return (
      <div 
        ref={windowRef}
        className={`portfolio-window ${window.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isResizing ? 'resizing' : ''}`}
        style={{ 
          left: isMaximized ? '0px' : `${positionX}px`,
          top: isMaximized ? '0px' : `${positionY}px`,
          width: isMaximized ? '100vw' : `${width}px`,
          height: isMaximized ? 'calc(100vh - 40px)' : `${height}px`,
          zIndex: window.zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
      <WindowTitleBar
        icon={getWindowIcon()}
        title={window.title}
        isMaximized={isMaximized}
        onMinimize={() => onMinimize(window.id)}
        onMaximize={handleMaximize}
        onClose={() => onClose(window.id)}
      />

      <WindowMenuBar items={menuItems} />

      <div className="window-body">
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'projects' && <ProjectsSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'experience' && <ExperienceSection />}
      </div>

      {!isMaximized && <ResizeHandles onResizeStart={handleResizeStart} windowRef={windowRef} />}
    </div>
  );
});
