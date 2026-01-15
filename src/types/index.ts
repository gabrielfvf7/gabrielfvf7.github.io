export interface OpenWindow {
  id: string;
  title: string;
  tab: string;
  isMinimized?: boolean;
  zIndex: number;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export type Theme = 'xp' | '95';
