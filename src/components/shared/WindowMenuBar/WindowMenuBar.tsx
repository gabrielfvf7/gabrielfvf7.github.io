import React from 'react';

interface WindowMenuBarProps {
  items: string[];
}

export const WindowMenuBar: React.FC<WindowMenuBarProps> = ({ items }) => {
  return (
    <div className="window-menu-bar">
      {items.map((item, index) => (
        <div key={index} className="menu-item">{item}</div>
      ))}
    </div>
  );
};
