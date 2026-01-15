import { useState, useEffect, useRef } from 'react';
import { initializeMinesweeper } from '../../utils/minesweeperGame';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import type { OpenWindow } from '../../types';
import type { MouseEvent } from 'react';

interface UseMinesweeperWindowProps {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const useMinesweeperWindow = ({ window: gameWindow, index, onBringToFront }: UseMinesweeperWindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [gameSize, setGameSize] = useState({ width: 180, height: 260 });
  const menuRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const gameControlsRef = useRef<{ 
    cleanup: () => void; 
    changeDifficulty: (level: 'beginner' | 'intermediate' | 'expert') => void 
  } | null>(null);

  const offsetX = 40 + index * 30;
  const offsetY = 60 + index * 30;

  const { position, handleMouseDown: dragMouseDown } = useDraggable({
    initialX: offsetX,
    initialY: offsetY,
    disabled: isMaximized,
  });

  const { size, isResizing, handleResizeStart, resetSize, setSize } = useResizable({
    initialWidth: gameSize.width,
    initialHeight: gameSize.height,
    minWidth: 170,
    minHeight: 220,
  });

  const handleMouseDown = (e: MouseEvent) => {
    onBringToFront(gameWindow.id);
    dragMouseDown(e);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
      resetSize();
    }
  };

  const handleResetGame = () => {
    const botao = document.getElementById('botao-reiniciar') as HTMLButtonElement;
    if (botao) botao.click();
    setShowGameMenu(false);
  };

  const handleChangeDifficulty = (level: string) => {
    if (gameControlsRef.current) {
      gameControlsRef.current.changeDifficulty(level as 'beginner' | 'intermediate' | 'expert');
    }
    
    const sizes = {
      beginner: { width: 180, height: 260 },
      intermediate: { width: 240, height: 320 },
      expert: { width: 380, height: 480 },
    };
    const newSize = sizes[level as keyof typeof sizes] || sizes.intermediate;
    setGameSize(newSize);
    setSize(newSize.width, newSize.height);
    
    setShowGameMenu(false);
  };

  const handleHelp = () => {
    window.open('https://www.google.com/search?q=Como+jogar+campo+minado', '_blank');
  };

  const restore = () => {
    if (isMaximized) {
      setIsMaximized(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const gameControls = initializeMinesweeper();
      gameControlsRef.current = gameControls;
      
      return () => {
        if (gameControls) gameControls.cleanup();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showGameMenu) {
        setShowGameMenu(false);
      }
    };

    if (showGameMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showGameMenu]);

  return {
    isMaximized,
    showGameMenu,
    menuRef,
    windowRef,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height,
    isResizing,
    handleMaximize,
    handleResizeStart,
    handleResetGame,
    handleChangeDifficulty,
    handleHelp,
    setShowGameMenu,
    restore,
    handleMouseDown,
  };
};
