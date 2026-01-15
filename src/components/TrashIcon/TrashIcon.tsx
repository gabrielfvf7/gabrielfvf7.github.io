import React from 'react';
import './TrashIcon.css';

interface TrashIconProps {
  onDoubleClick: () => void;
}

export const TrashIcon: React.FC<TrashIconProps> = ({ onDoubleClick }) => {
  return (
    <div 
      className="trash-icon"
      onDoubleClick={onDoubleClick}
      title="Lixeira"
    >
      <img 
        src="/icons/Recycle Bin (empty).png" 
        alt="Lixeira" 
        className="trash-image"
      />
      <div className="trash-label">Lixeira</div>
    </div>
  );
};
