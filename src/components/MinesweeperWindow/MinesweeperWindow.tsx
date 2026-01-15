import { useState, useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import type { OpenWindow } from '../../types';
import { initializeMinesweeper } from '../../utils/minesweeperGame';
import './MinesweeperWindow.css';

interface MinesweeperWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
}

export interface MinesweeperWindowRef {
  restore: () => void;
}

export const MinesweeperWindow = forwardRef<MinesweeperWindowRef, MinesweeperWindowProps>(
  ({ window: gameWindow, index, onClose }, ref) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [showGameMenu, setShowGameMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const gameControlsRef = useRef<{ cleanup: () => void; changeDifficulty: (level: 'beginner' | 'intermediate' | 'expert') => void } | null>(null);
    const offsetX = 40 + index * 30;
    const offsetY = 60 + index * 30;

    const handleMinimize = () => {
      setIsMinimized(!isMinimized);
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
      console.log('handleChangeDifficulty called with:', level);
      if (gameControlsRef.current) {
        gameControlsRef.current.changeDifficulty(level as 'beginner' | 'intermediate' | 'expert');
      } else {
        console.error('Game controls not initialized');
      }
      setShowGameMenu(false);
    };

    const handleHelp = () => {
      window.open('https://www.google.com/search?q=Como+jogar+campo+minado', '_blank');
    };

    useImperativeHandle(ref, () => ({
      restore: () => {
        if (isMinimized) {
          setIsMinimized(false);
        }
      }
    }));

    useEffect(() => {
      // Aguardar a montagem do componente antes de inicializar o jogo
      const timeoutId = setTimeout(() => {
        const gameControls = initializeMinesweeper();
        gameControlsRef.current = gameControls;
        
        // Retornar função de limpeza
        return () => {
          if (gameControls) gameControls.cleanup();
        };
      }, 100);

      return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
      // Fechar menu ao clicar fora
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

    return (
      <div 
        className={`minesweeper-window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
        style={{ 
          left: `${offsetX}px`,
          top: `${offsetY}px`,
          zIndex: 100 + index
        }}
      >
        {/* Title Bar */}
        <div className="window-title-bar">
          <img src="/icons/Minesweeper.png" alt="" className="window-icon" />
          <div className="window-title">Minesweeper</div>
          <div className="window-controls">
            <button 
              aria-label="Minimize" 
              className="window-control-btn minimize-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMinimize();
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
                onClose(gameWindow.id);
              }}
            >
              <img src="/Exit.png" alt="" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="window-menu-bar">
          <div 
            ref={menuRef}
            className="menu-item" 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Menu clicked, current state:', showGameMenu);
              setShowGameMenu(!showGameMenu);
            }}
          >
            Jogo
          </div>
          <div className="menu-item" onClick={handleHelp}>Ajuda</div>
        </div>
        
        {/* Dropdown Menu - renderizado fora para evitar overflow */}
        {showGameMenu && (
          <div 
            className="dropdown-menu" 
            style={{
              position: 'absolute',
              left: '0px',
              top: '49px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dropdown-item" onClick={handleResetGame}>Novo Jogo</div>
            <div className="dropdown-separator"></div>
            <div className="dropdown-item" onClick={() => handleChangeDifficulty('beginner')}>Iniciante</div>
            <div className="dropdown-item" onClick={() => handleChangeDifficulty('intermediate')}>Intermediário</div>
            <div className="dropdown-item" onClick={() => handleChangeDifficulty('expert')}>Expert</div>
          </div>
        )}

        {/* Window Body */}
        <div className="window-content">
          <div className="minesweeper-body">
            <div id="status-jogo" className="status-bar">
              <div id="timer" className="display-box"></div>
              <button id="botao-reiniciar" className="face-button"></button>
              <div id="contador-bandeiras" className="display-box"></div>
            </div>

            {/* Seletor oculto - necessário para o jogo funcionar */}
            <select id="dificuldade" defaultValue="intermediate" style={{ display: 'none' }}>
              <option value="beginner">Iniciante (8x8, 10)</option>
              <option value="intermediate">Intermediário (10x10, 15)</option>
              <option value="expert">Expert (16x16, 40)</option>
            </select>

            <div id="tabuleiro"></div>

            <div id="mensagem-final" className="oculto">
              <p id="texto-mensagem"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MinesweeperWindow.displayName = 'MinesweeperWindow';
