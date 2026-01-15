import React, { useRef, useEffect, useCallback } from 'react';
import './App.css';

import { useWindowManager, useTheme, useTime } from './hooks';
import { useStartMenu } from './components/StartMenu';

import { 
  DesktopContainer, 
  DesktopIcons, 
  PortfolioWindow, 
  StartMenu, 
  Taskbar, 
  TrashIcon,
  ModernPortfolio
} from './components';
import { MinesweeperWindow } from './components/MinesweeperWindow';
import { PaintWindow } from './components/PaintWindow';
import { ResumeWindow } from './components/ResumeWindow';
import type { DesktopIconsRef } from './components/DesktopIcons/DesktopIcons';
import type { PortfolioWindowRef } from './components/PortfolioWindow/PortfolioWindow';
import type { MinesweeperWindowRef } from './components/MinesweeperWindow';
import type { PaintWindowRef } from './components/PaintWindow';
import type { ResumeWindowRef } from './components/ResumeWindow';

const Portfolio: React.FC = () => {
  const { openWindows, openWindow, closeWindow, bringToFront, toggleMinimize } = useWindowManager();
  const { startMenuOpen, toggleStartMenu, closeStartMenu } = useStartMenu();
  const { theme, toggleTheme } = useTheme();
  const currentTime = useTime();
  const desktopIconsRef = useRef<DesktopIconsRef>(null);
  const windowRefs = useRef<Map<string, PortfolioWindowRef | MinesweeperWindowRef | PaintWindowRef | ResumeWindowRef>>(new Map());

  const handleDesktopClick = useCallback(() => {
    closeStartMenu();
    desktopIconsRef.current?.clearSelection();
  }, [closeStartMenu]);

  const handleIconDoubleClick = useCallback((tab: string) => {
    closeStartMenu();
    openWindow(tab);
  }, [closeStartMenu, openWindow]);

  const handleWindowClick = useCallback((windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;
    
    if (!window.isMinimized) {
      toggleMinimize(windowId);
    } else {
      toggleMinimize(windowId);
      bringToFront(windowId);
    }
  }, [openWindows, toggleMinimize, bringToFront]);

  const handleTrashDoubleClick = useCallback(() => {
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('.start-button')) {
        return;
      }
      
      if (target.closest('.start-menu')) {
        return;
      }
      
      if (startMenuOpen) {
        closeStartMenu();
      }
    };

    if (startMenuOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [startMenuOpen, closeStartMenu]);

  if (theme === 'modern') {
    return <ModernPortfolio onSwitchToXP={toggleTheme} />;
  }

  return (
    <DesktopContainer onDesktopClick={handleDesktopClick}>
      <DesktopIcons 
        ref={desktopIconsRef}
        onIconDoubleClick={handleIconDoubleClick}
        onModernVersionClick={toggleTheme}
      />
      
      <TrashIcon onDoubleClick={handleTrashDoubleClick} />

      {}
      <div className="absolute top-0 left-0 w-full h-[calc(100%-30px)] overflow-hidden pointer-events-none">
        {openWindows.map((window, index) => {
          if (window.tab === 'minesweeper') {
            return (
              <MinesweeperWindow 
                key={window.id}
                ref={(ref) => {
                  if (ref) {
                    windowRefs.current.set(window.id, ref);
                  } else {
                    windowRefs.current.delete(window.id);
                  }
                }}
                window={window} 
                index={index}
                onClose={closeWindow}
                onBringToFront={bringToFront}
                onMinimize={toggleMinimize}
              />
            );
          }
          if (window.tab === 'paint') {
            return (
              <PaintWindow 
                key={window.id}
                ref={(ref) => {
                  if (ref) {
                    windowRefs.current.set(window.id, ref);
                  } else {
                    windowRefs.current.delete(window.id);
                  }
                }}
                window={window} 
                index={index}
                onClose={closeWindow}
                onBringToFront={bringToFront}
                onMinimize={toggleMinimize}
              />
            );
          }
          if (window.tab === 'resume') {
            return (
              <ResumeWindow 
                key={window.id}
                ref={(ref) => {
                  if (ref) {
                    windowRefs.current.set(window.id, ref);
                  } else {
                    windowRefs.current.delete(window.id);
                  }
                }}
                window={window} 
                index={index}
                onClose={closeWindow}
                onBringToFront={bringToFront}
                onMinimize={toggleMinimize}
              />
            );
          }
          return (
            <PortfolioWindow 
              key={window.id}
              ref={(ref) => {
                if (ref) {
                  windowRefs.current.set(window.id, ref);
                } else {
                  windowRefs.current.delete(window.id);
                }
              }}
              window={window} 
              index={index}
              onClose={closeWindow}
              onBringToFront={bringToFront}
              onMinimize={toggleMinimize}
            />
          );
        })}
      </div>

      <StartMenu 
        isOpen={startMenuOpen} 
        onOpenWindow={openWindow}
        onClose={closeStartMenu}
      />
      
      <Taskbar 
        onStartMenuToggle={toggleStartMenu}
        openWindows={openWindows}
        onWindowClick={handleWindowClick}
        currentTime={currentTime}
      />
    </DesktopContainer>
  );
};

export default Portfolio;