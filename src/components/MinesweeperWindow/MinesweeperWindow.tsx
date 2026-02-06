import { useImperativeHandle, forwardRef } from "react";
import type { OpenWindow } from "../../types";
import { useMinesweeperWindow } from "./useMinesweeperWindow";
import { ResizeHandles } from "../ResizeHandles";
import "./MinesweeperWindow.css";
import "../../styles/leaderboard-modal.css";

interface MinesweeperWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string) => void;
  onOpenWindow?: (tab: string) => void;
}

export interface MinesweeperWindowRef {
  restore: () => void;
}

export const MinesweeperWindow = forwardRef<
  MinesweeperWindowRef,
  MinesweeperWindowProps
>(
  (
    {
      window: gameWindow,
      index,
      onClose,
      onBringToFront,
      onMinimize,
      onOpenWindow,
    },
    ref,
  ) => {
    const {
      isMaximized,
      showGameMenu,
      menuRef,
      windowRef,
      positionX,
      positionY,
      isResizing,
      handleMaximize,
      handleResizeStart,
      handleResetGame,
      handleChangeDifficulty,
      handleHelp,
      handleLeaderboard,
      setShowGameMenu,
      restore,
      handleMouseDown,
    } = useMinesweeperWindow({
      window: gameWindow,
      index,
      onBringToFront,
      onOpenWindow,
    });

    useImperativeHandle(ref, () => ({ restore }));

    return (
      <div
        ref={windowRef}
        className={`minesweeper-window ${gameWindow.isMinimized ? "minimized" : ""} ${isMaximized ? "maximized" : ""} ${isResizing ? "resizing" : ""}`}
        style={{
          left: isMaximized ? "0px" : `${positionX}px`,
          top: isMaximized ? "0px" : `${positionY}px`,
          ...(isMaximized && {
            width: "100vw",
            height: "calc(100vh - 30px)",
          }),
          zIndex: gameWindow.zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        {}
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
                onMinimize(gameWindow.id);
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
              <img
                src={isMaximized ? "/Restore.png" : "/Maximize.png"}
                alt=""
              />
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

        {}
        <div className="window-menu-bar">
          <div
            ref={menuRef}
            className="menu-item"
            onClick={(e) => {
              e.stopPropagation();
              setShowGameMenu(!showGameMenu);
            }}
          >
            Jogo
          </div>
          <div className="menu-item" onClick={handleHelp}>
            Ajuda
          </div>
        </div>

        {}
        {showGameMenu && (
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              left: "0px",
              top: "49px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dropdown-item" onClick={handleResetGame}>
              Novo Jogo
            </div>
            <div className="dropdown-separator"></div>
            <div
              className="dropdown-item"
              onClick={() => handleChangeDifficulty("beginner")}
            >
              Iniciante
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleChangeDifficulty("intermediate")}
            >
              Intermediário
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleChangeDifficulty("expert")}
            >
              Expert
            </div>
            <div className="dropdown-separator"></div>
            <div className="dropdown-item" onClick={handleLeaderboard}>
              🏆 Leaderboard
            </div>
          </div>
        )}

        {}
        <div className="window-content">
          <div className="minesweeper-body">
            <div id="status-jogo" className="status-bar">
              <div id="timer" className="display-box"></div>
              <button id="botao-reiniciar" className="face-button"></button>
              <div id="contador-bandeiras" className="display-box"></div>
            </div>

            {}
            <select
              id="dificuldade"
              defaultValue="intermediate"
              style={{ display: "none" }}
            >
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

        {!isMaximized && (
          <ResizeHandles
            onResizeStart={handleResizeStart}
            windowRef={windowRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </div>
    );
  },
);

MinesweeperWindow.displayName = "MinesweeperWindow";
