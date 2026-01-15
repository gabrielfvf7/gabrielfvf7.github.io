import React, { useRef, useEffect } from 'react';
import './App.css';

// Custom Hooks
import { useWindowManager, useTheme, useTime } from './hooks';
import { useStartMenu } from './components/StartMenu';

// Components
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
import type { DesktopIconsRef } from './components/DesktopIcons/DesktopIcons';
import type { PortfolioWindowRef } from './components/PortfolioWindow/PortfolioWindow';
import type { MinesweeperWindowRef } from './components/MinesweeperWindow';
import type { PaintWindowRef } from './components/PaintWindow';

const Portfolio: React.FC = () => {
  const { openWindows, openWindow, closeWindow, bringToFront, toggleMinimize } = useWindowManager();
  const { startMenuOpen, toggleStartMenu, closeStartMenu } = useStartMenu();
  const { theme, toggleTheme } = useTheme();
  const currentTime = useTime();
  const desktopIconsRef = useRef<DesktopIconsRef>(null);
  const windowRefs = useRef<Map<string, PortfolioWindowRef | MinesweeperWindowRef | PaintWindowRef>>(new Map());

  const handleDesktopClick = () => {
    closeStartMenu();
    desktopIconsRef.current?.clearSelection();
  };

  const handleIconDoubleClick = (tab: string) => {
    closeStartMenu();
    openWindow(tab);
  };

  const handleWindowClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;
    
    // Se a janela já está aberta e não minimizada, minimizar
    if (!window.isMinimized) {
      toggleMinimize(windowId);
    } else {
      // Se está minimizada, restaurar e trazer para frente
      toggleMinimize(windowId);
      bringToFront(windowId);
    }
  };

  const handleTrashDoubleClick = () => {
    // Close window logic
  };

  // Fechar menu iniciar ao clicar fora (exceto no botão start)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Verificar se clicou no botão start
      if (target.closest('.start-button')) {
        return;
      }
      
      // Verificar se clicou no menu iniciar
      if (target.closest('.start-menu')) {
        return;
      }
      
      // Fechar o menu se clicou em qualquer outro lugar
      if (startMenuOpen) {
        closeStartMenu();
      }
    };

    if (startMenuOpen) {
      // Adicionar delay para não fechar imediatamente ao abrir
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

      {/* Open Windows */}
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