import { useState } from 'react';

export const useStartMenu = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const closeStartMenu = () => {
    setStartMenuOpen(false);
  };

  return { startMenuOpen, toggleStartMenu, closeStartMenu, setStartMenuOpen };
};
