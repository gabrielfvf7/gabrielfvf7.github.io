import { useState, useEffect, useRef } from "react";
import { useDraggable } from "../../hooks/useDraggable";
import { useResizable } from "../../hooks/useResizable";
import type { OpenWindow } from "../../types";
import type { LeaderboardEntry } from "../../services/leaderboardService";
import {
  LEADERBOARD_ERROR_KEY,
  LEADERBOARD_OFFLINE_MESSAGE,
  PENDING_SCORE_KEY,
  leaderboardService,
} from "../../services/leaderboardService";

type PendingScore = {
  difficulty: "beginner" | "intermediate" | "expert";
  timeInSeconds: number;
  boardConfig: {
    rows: number;
    cols: number;
    mines: number;
  };
};

const readPendingScore = (): PendingScore | null => {
  try {
    const raw = localStorage.getItem(PENDING_SCORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingScore;
    if (!parsed?.difficulty || typeof parsed.timeInSeconds !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const readStoredError = (): string | null => {
  const stored = localStorage.getItem(LEADERBOARD_ERROR_KEY);
  if (!stored) return null;
  localStorage.removeItem(LEADERBOARD_ERROR_KEY);
  return stored;
};
interface UseLeaderboardWindowParams {
  window: OpenWindow;
  index: number;
  onBringToFront: (id: string) => void;
}

export const useLeaderboardWindow = ({
  window: leaderboardWindow,
  index,
  onBringToFront,
}: UseLeaderboardWindowParams) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<
    "beginner" | "intermediate" | "expert"
  >("beginner");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingScore, setPendingScore] = useState<PendingScore | null>(null);
  const [pendingName, setPendingName] = useState("");

  const windowRef = useRef<HTMLDivElement>(null);

  const { position, handleMouseDown: dragMouseDown } = useDraggable({
    initialX: 150 + index * 30,
    initialY: 100 + index * 30,
  });

  const { size, isResizing, handleResizeStart } = useResizable({
    initialWidth: 500,
    initialHeight: 400,
    minWidth: 400,
    minHeight: 300,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    onBringToFront(leaderboardWindow.id);
    dragMouseDown(e);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const loadLeaderboard = async (
    difficulty: "beginner" | "intermediate" | "expert",
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await leaderboardService.getLeaderboard(difficulty, 10);
      setLeaderboardData(data);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Erro ao carregar leaderboard";
      setError(message);
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDifficulty = (
    difficulty: "beginner" | "intermediate" | "expert",
  ) => {
    setCurrentDifficulty(difficulty);
    loadLeaderboard(difficulty);
  };

  const clearPendingScore = () => {
    localStorage.removeItem(PENDING_SCORE_KEY);
    setPendingScore(null);
    setPendingName("");
  };

  const submitPendingScore = async () => {
    if (!pendingScore) return;
    if (pendingName.trim().length === 0) return;
    const trimmedName = pendingName.trim();
    const playerName = trimmedName.length > 0 ? trimmedName : "Jogador";

    try {
      await leaderboardService.submitScore({
        playerName,
        difficulty: pendingScore.difficulty,
        timeInSeconds: pendingScore.timeInSeconds,
        boardConfig: pendingScore.boardConfig,
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : LEADERBOARD_OFFLINE_MESSAGE;
      setError(message);
      return;
    }

    const difficulty = pendingScore.difficulty;
    clearPendingScore();
    setCurrentDifficulty(difficulty);
    await loadLeaderboard(difficulty);
  };

  const restore = () => {
    if (isMaximized) {
      setIsMaximized(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    loadLeaderboard(currentDifficulty);
  }, [currentDifficulty]);

  useEffect(() => {
    const storedError = readStoredError();
    if (storedError) {
      setError(storedError);
      setIsLoading(false);
    }

    const pending = readPendingScore();
    if (pending) {
      setPendingScore(pending);
      setPendingName("");
      setCurrentDifficulty(pending.difficulty);
    }
  }, []);

  return {
    isMaximized,
    currentDifficulty,
    leaderboardData,
    isLoading,
    error,
    windowRef,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height,
    isResizing,
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
  };
};
