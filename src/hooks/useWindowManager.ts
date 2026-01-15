import { useState } from 'react';
import type { OpenWindow } from '../types';
import { WINDOW_TITLES } from '../constants';

export const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const openWindow = (tab: string) => {
    const newWindow: OpenWindow = {
      id: `window-${Date.now()}`,
      title: WINDOW_TITLES[tab] || tab,
      tab: tab
    };
    setOpenWindows([...openWindows, newWindow]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  return { openWindows, openWindow, closeWindow };
};
