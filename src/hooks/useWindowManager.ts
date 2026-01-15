import { useState } from 'react';
import type { OpenWindow } from '../types';
import { WINDOW_TITLES } from '../constants';

export const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);

  const openWindow = (tab: string) => {
    const newZIndex = maxZIndex + 1;
    const newWindow: OpenWindow = {
      id: `window-${Date.now()}`,
      title: WINDOW_TITLES[tab] || tab,
      tab: tab,
      isMinimized: false,
      zIndex: newZIndex
    };
    setMaxZIndex(newZIndex);
    setOpenWindows([...openWindows, newWindow]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
    ));
  };

  const toggleMinimize = (id: string) => {
    setOpenWindows(openWindows.map(w => {
      if (w.id === id) {
        return { ...w, isMinimized: !w.isMinimized };
      }
      return w;
    }));
  };

  return { openWindows, openWindow, closeWindow, bringToFront, toggleMinimize };
};
