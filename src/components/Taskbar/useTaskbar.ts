import type { OpenWindow } from '../../types';

export const useTaskbar = () => {
  const getWindowIcon = (window: OpenWindow) => {
    switch(window.tab) {
      case 'about': return '/icons/User Accounts.png';
      case 'projects': return '/icons/Freecell.png';
      case 'experience': return '/icons/Scheduled Tasks.png';
      case 'skills': return '/icons/System Information.png';
      case 'minesweeper': return '/icons/Minesweeper.png';
      default: return '/icons/Default.png';
    }
  };

  return {
    getWindowIcon,
  };
};
