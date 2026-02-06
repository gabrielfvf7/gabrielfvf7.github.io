export interface LeaderboardEntry {
  id: number;
  playerName: string;
  difficulty: "beginner" | "intermediate" | "expert";
  timeInSeconds: number;
  boardConfig: {
    rows: number;
    cols: number;
    mines: number;
  };
  createdAt: string;
}

export interface SubmitScoreData {
  playerName: string;
  difficulty: "beginner" | "intermediate" | "expert";
  timeInSeconds: number;
  boardConfig: {
    rows: number;
    cols: number;
    mines: number;
  };
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const PENDING_SCORE_KEY = "pendingLeaderboardScore";
export const LEADERBOARD_ERROR_KEY = "leaderboardErrorMessage";
export const LEADERBOARD_OFFLINE_MESSAGE =
  "Ocorreu um erro ao pegar os dados. Tente novamente mais tarde.";

class LeaderboardService {
  async isBackendOnline(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 2500);
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  async getLeaderboard(
    difficulty: "beginner" | "intermediate" | "expert",
    limit = 10,
  ): Promise<LeaderboardEntry[]> {
    const isOnline = await this.isBackendOnline();
    if (!isOnline) {
      throw new Error(LEADERBOARD_OFFLINE_MESSAGE);
    }

    const response = await fetch(
      `${API_BASE_URL}/scores/leaderboard/${difficulty}?limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error(LEADERBOARD_OFFLINE_MESSAGE);
    }

    return await response.json();
  }

  async submitScore(data: SubmitScoreData): Promise<boolean> {
    const isOnline = await this.isBackendOnline();
    if (!isOnline) {
      throw new Error(LEADERBOARD_OFFLINE_MESSAGE);
    }

    const response = await fetch(`${API_BASE_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(LEADERBOARD_OFFLINE_MESSAGE);
    }

    return true;
  }

  async isScoreInTop10(
    difficulty: "beginner" | "intermediate" | "expert",
    timeInSeconds: number,
  ): Promise<boolean> {
    const leaderboard = await this.getLeaderboard(difficulty, 10);

    // Se há menos de 10 entradas, sempre qualifica
    if (leaderboard.length < 10) {
      return true;
    }

    // Se o tempo é melhor que o 10º lugar
    const worstTop10Time = leaderboard[9].timeInSeconds;
    return timeInSeconds < worstTop10Time;
  }
}

export const leaderboardService = new LeaderboardService();
