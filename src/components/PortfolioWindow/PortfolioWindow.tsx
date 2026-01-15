import { useImperativeHandle, forwardRef } from 'react';
import type { OpenWindow } from '../../types';
import { usePortfolioWindow } from './usePortfolioWindow';
import { WindowTitleBar } from '../shared/WindowTitleBar';
import { WindowMenuBar } from '../shared/WindowMenuBar';
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
      offsetX,
      offsetY,
      handleMaximize,
      restore,
      getWindowIcon,
      handleMouseDown,
    } = usePortfolioWindow({ window, index, onBringToFront });

    useImperativeHandle(ref, () => ({ restore }));

    const menuItems = ['Arquivo', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda'];

  return (
      <div 
        className={`portfolio-window ${window.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
        style={{ 
          left: `${offsetX}px`,
          top: `${offsetY}px`,
          zIndex: window.zIndex
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
    </div>
  );
});
