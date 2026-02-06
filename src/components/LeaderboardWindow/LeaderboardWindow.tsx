import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import type { OpenWindow } from "../../types";
import type { LeaderboardEntry } from "../../services/leaderboardService";
import { ResizeHandles } from "../ResizeHandles";
import "./LeaderboardWindow.css";
import { useLeaderboardWindow } from "./useLeaderboardWindow";

interface LeaderboardWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string) => void;
}

export interface LeaderboardWindowRef {
  restore: () => void;
}

export const LeaderboardWindow = forwardRef<
  LeaderboardWindowRef,
  LeaderboardWindowProps
>(
  (
    { window: leaderboardWindow, index, onClose, onBringToFront, onMinimize },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
      isMaximized,
      windowRef,
      positionX,
      positionY,
      width,
      height,
      currentDifficulty,
      leaderboardData,
      isLoading,
      error,
      handleMaximize,
      handleResizeStart,
      handleChangeDifficulty,
      restore,
      handleMouseDown,
      pendingScore,
      pendingName,
      setPendingName,
      submitPendingScore,
      clearPendingScore,
    } = useLeaderboardWindow({
      window: leaderboardWindow,
      index,
      onBringToFront,
    });

    useImperativeHandle(ref, () => ({ restore }));

    const difficultyNames = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      expert: "Expert",
    };

    const isNameValid = pendingName.trim().length > 0;

    useEffect(() => {
      if (pendingScore) {
        inputRef.current?.focus();
      }
    }, [pendingScore]);

    return (
      <div
        ref={windowRef}
        className={`leaderboard-window ${isMaximized ? "maximized" : ""}`}
        style={{
          position: "absolute",
          left: isMaximized ? 0 : positionX,
          top: isMaximized ? 0 : positionY,
          width: isMaximized ? "100%" : width,
          height: isMaximized ? "100%" : height,
          zIndex: leaderboardWindow.zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="window-title-bar">
          <img src="/icons/Minesweeper.png" alt="" className="window-icon" />
          <div className="window-title">🏆 Leaderboard - Campo Minado</div>
          <div className="window-controls">
            <button
              aria-label="Minimize"
              className="window-control-btn minimize-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMinimize(leaderboardWindow.id);
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
                onClose(leaderboardWindow.id);
              }}
            >
              <img src="/Exit.png" alt="" />
            </button>
          </div>
        </div>

        <div className="window-content">
          {/* Abas de dificuldade */}
          <div className="difficulty-tabs">
            {Object.entries(difficultyNames).map(([key, name]) => (
              <button
                key={key}
                className={`tab-button ${currentDifficulty === key ? "active" : ""}`}
                onClick={() =>
                  handleChangeDifficulty(
                    key as "beginner" | "intermediate" | "expert",
                  )
                }
              >
                {name}
              </button>
            ))}
          </div>

          {/* Conteúdo do leaderboard */}
          <div className="leaderboard-content">
            {pendingScore && (
              <div className="leaderboard-prompt">
                <div className="leaderboard-prompt-title">
                  Novo recorde! Insira seu nome:
                </div>
                <div className="leaderboard-prompt-meta">
                  Tempo: <strong>{pendingScore.timeInSeconds}s</strong>
                </div>
                <div className="leaderboard-prompt-row">
                  <input
                    type="text"
                    className="leaderboard-prompt-input"
                    ref={inputRef}
                    value={pendingName}
                    onChange={(e) => setPendingName(e.target.value)}
                    placeholder="Seu nome"
                    maxLength={20}
                  />
                  <button
                    className="leaderboard-prompt-btn"
                    onClick={submitPendingScore}
                    disabled={!isNameValid}
                  >
                    Salvar
                  </button>
                  <button
                    className="leaderboard-prompt-btn secondary"
                    onClick={clearPendingScore}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            <h3 className="leaderboard-title">
              🎯 Top 10 -{" "}
              {
                difficultyNames[
                  currentDifficulty as keyof typeof difficultyNames
                ]
              }
            </h3>

            <div className="leaderboard-list">
              {isLoading ? (
                <div className="loading-message">Carregando...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : leaderboardData.length === 0 ? (
                <div className="empty-message">
                  Nenhum score registrado ainda!
                </div>
              ) : (
                <div className="scores-grid">
                  <div className="scores-header">
                    <span className="position">Pos.</span>
                    <span className="player-name">Jogador</span>
                    <span className="time">Tempo</span>
                    <span className="date">Data</span>
                  </div>
                  {leaderboardData.map(
                    (score: LeaderboardEntry, index: number) => (
                      <div key={score.id} className="score-row">
                        <span className="position">{index + 1}º</span>
                        <span className="player-name">{score.playerName}</span>
                        <span className="time">{score.timeInSeconds}s</span>
                        <span className="date">
                          {new Date(score.createdAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              )}
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

LeaderboardWindow.displayName = "LeaderboardWindow";
