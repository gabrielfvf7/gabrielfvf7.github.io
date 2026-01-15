import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'xp' | 'modern'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return (savedTheme as 'xp' | 'modern') || 'modern';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'xp' ? 'modern' : 'xp';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return { theme, setTheme, toggleTheme };
};
