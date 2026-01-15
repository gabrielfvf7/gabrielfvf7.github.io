import { useState } from 'react';

export const useDesktopIcons = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (e: React.MouseEvent, iconId: string) => {
    e.stopPropagation();
    setSelectedIcon(iconId);
  };

  const clearSelection = () => {
    setSelectedIcon(null);
  };

  return {
    selectedIcon,
    handleIconClick,
    clearSelection,
  };
};
