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
import type { DesktopIconsRef } from './components/DesktopIcons/DesktopIcons';
import type { PortfolioWindowRef } from './components/PortfolioWindow/PortfolioWindow';

const Portfolio: React.FC = () => {
  const { openWindows, openWindow, closeWindow } = useWindowManager();
  const { startMenuOpen, toggleStartMenu, closeStartMenu } = useStartMenu();
  const { theme, toggleTheme } = useTheme();
  const currentTime = useTime();
  const desktopIconsRef = useRef<DesktopIconsRef>(null);
  const windowRefs = useRef<Map<string, PortfolioWindowRef>>(new Map());

  // Update favicon based on theme
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = theme === 'xp' ? '/favicon-xp.png' : '/favicon-modern.png';
    }
  }, [theme]);

  const handleDesktopClick = () => {
    closeStartMenu();
    desktopIconsRef.current?.clearSelection();
  };

  const handleIconDoubleClick = (tab: string) => {
    closeStartMenu();
    openWindow(tab);
  };

  const handleWindowClick = (windowId: string) => {
    const windowRef = windowRefs.current.get(windowId);
    if (windowRef) {
      windowRef.restore();
    }
  };

  const handleTrashDoubleClick = () => {
    // Close window logic
  };

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
        {openWindows.map((window, index) => (
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
          />
        ))}
      </div>

      <StartMenu 
        isOpen={startMenuOpen} 
        onOpenWindow={openWindow}
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