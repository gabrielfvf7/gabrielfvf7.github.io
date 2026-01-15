import React from 'react';
import { PERSONAL_INFO, DESKTOP_ICONS } from '../../constants';
import './StartMenu.css';

interface StartMenuProps {
  isOpen: boolean;
  onOpenWindow: (tab: string) => void;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ 
  isOpen, 
  onOpenWindow,
  onClose
}) => {
  if (!isOpen) return null;

  const programs = [
    ...DESKTOP_ICONS
  ];

  const systemItems = [
    { id: 'mycomputer', label: 'My Computer', icon: '/icons/My Computer.png' },
    { id: 'mydocs', label: 'My Documents', icon: '/icons/My Documents.png' },
    { id: 'mypics', label: 'My Pictures', icon: '/icons/My Pictures.png' },
    { id: 'mymusic', label: 'My Music', icon: '/icons/My Music.png' },
    { id: 'controlpanel', label: 'Control Panel', icon: '/icons/Control Panel.png' },
  ];

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      {}
      <div className="start-menu-header">
        <img 
          src="/avatar.jpg" 
          alt={PERSONAL_INFO.name} 
          className="user-avatar"
        />
        <div className="user-info">
          <div className="user-name">{PERSONAL_INFO.name}</div>
        </div>
      </div>

      {}
      <div className="start-menu-content" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="start-menu-left">
          <div className="programs-list">
            <div
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://google.com', '_blank');
              }}
            >
              <img src="/icons/Internet Explorer 6.png" alt="Internet Explorer" className="menu-icon" />
              <span className="menu-label">Internet Explorer</span>
            </div>
            <div
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${PERSONAL_INFO.email}`;
              }}
            >
              <img src="/icons/Outlook Express.png" alt="E-mail" className="menu-icon" />
              <span className="menu-label">E-mail</span>
            </div>
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWindow(program.id);
                  onClose();
                }}
                className="menu-item"
              >
                <img src={program.icon} alt={program.label} className="menu-icon" />
                <span className="menu-label">{program.label}</span>
              </div>
            ))}
          </div>

          <div className="menu-divider"></div>

          <div className="all-programs">
            <img src="/icons/Start Menu Programs.png" alt="All Programs" className="menu-icon" />
            <span className="menu-label">All Programs</span>
            <span className="arrow">▶</span>
          </div>
        </div>

        {}
        <div className="start-menu-right">
          {systemItems.map((item) => (
            <div
              key={item.id}
              className="menu-item"
            >
              <img src={item.icon} alt={item.label} className="menu-icon-small" />
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
