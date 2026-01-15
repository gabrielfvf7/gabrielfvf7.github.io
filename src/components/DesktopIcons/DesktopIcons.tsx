import { useImperativeHandle, forwardRef } from 'react';
import { DESKTOP_ICONS } from '../../constants';
import { useDesktopIcons } from './useDesktopIcons';
import './DesktopIcons.css';

interface DesktopIconsProps {
  onIconDoubleClick: (tab: string) => void;
  onModernVersionClick: () => void;
}

export interface DesktopIconsRef {
  clearSelection: () => void;
}

export const DesktopIcons = forwardRef<DesktopIconsRef, DesktopIconsProps>(({ 
  onIconDoubleClick,
  onModernVersionClick
}, ref) => {
  const { selectedIcon, handleIconClick, clearSelection } = useDesktopIcons();

  useImperativeHandle(ref, () => ({ clearSelection }));

  const handleIconDoubleClick = (iconId: string) => {
    if (iconId === 'modern-version') {
      onModernVersionClick();
    } else {
      onIconDoubleClick(iconId);
    }
  };

  const allIcons = [
    ...DESKTOP_ICONS,
    { id: 'modern-version', label: 'Versão Moderna', icon: '/icons/Display Properties.png' }
  ];

  return (
    <div className="desktop-icons-container">
      {allIcons.map(icon => (
        <div 
          key={icon.id}
          className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
          onClick={(e) => handleIconClick(e, icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
          title={icon.label}
        >
          <img src={icon.icon} alt={icon.label} className="icon-image" />
          <div className="icon-label">
            {icon.label}
          </div>
        </div>
      ))}
    </div>
  );
});
