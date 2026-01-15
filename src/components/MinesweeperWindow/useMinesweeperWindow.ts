import { useState, useEffect, useRef } from 'react';
import { initializeMinesweeper } from '../../utils/minesweeperGame';
import { useDraggable } from '../../hooks/useDraggable';
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
  const menuRef = useRef<HTMLDivElement>(null);
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

  const handleMouseDown = (e: MouseEvent) => {
    onBringToFront(gameWindow.id);
    dragMouseDown(e);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
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
    setShowGameMenu(false);
  };

  const handleHelp = () => {
    window.open('https://www.google.com/search?q=Como+jogar+campo+minado', '_blank');
  };

  const restore = () => {
    // Restore apenas maximização, não minimização
    if (isMaximized) {
      setIsMaximized(false);
    }
  };

  // Inicializar o jogo
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

  // Fechar menu ao clicar fora
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
    positionX: position.x,
    positionY: position.y,
    handleMaximize,
    handleResetGame,
    handleChangeDifficulty,
    handleHelp,
    setShowGameMenu,
    restore,
    handleMouseDown,
  };
};
