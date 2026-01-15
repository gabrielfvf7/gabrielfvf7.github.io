import React from 'react';
import { PERSONAL_INFO, DESKTOP_ICONS } from '../../constants';
import './StartMenu.css';

interface StartMenuProps {
  isOpen: boolean;
  onOpenWindow: (tab: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ 
  isOpen, 
  onOpenWindow
}) => {
  if (!isOpen) return null;

  const programs = [
    ...DESKTOP_ICONS
  ];

  const systemItems = [
    { id: 'mycomputer', label: 'My Computer', icon: '/winsXpIcons/My Computer.png' },
    { id: 'mydocs', label: 'My Documents', icon: '/winsXpIcons/My Documents.png' },
    { id: 'mypics', label: 'My Pictures', icon: '/winsXpIcons/My Pictures.png' },
    { id: 'mymusic', label: 'My Music', icon: '/winsXpIcons/My Music.png' },
    { id: 'controlpanel', label: 'Control Panel', icon: '/winsXpIcons/Control Panel.png' },
  ];

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      {/* Header with user info */}
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

      {/* Main Content */}
      <div className="start-menu-content" onClick={(e) => e.stopPropagation()}>
        {/* Left Panel - Programs */}
        <div className="start-menu-left">
          <div className="programs-list">
            <div
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://google.com', '_blank');
              }}
            >
              <img src="/winsXpIcons/Internet Explorer 6.png" alt="Internet Explorer" className="menu-icon" />
              <span className="menu-label">Internet Explorer</span>
            </div>
            <div
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${PERSONAL_INFO.email}`;
              }}
            >
              <img src="/winsXpIcons/Outlook Express.png" alt="E-mail" className="menu-icon" />
              <span className="menu-label">E-mail</span>
            </div>
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWindow(program.id);
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
            <img src="/winsXpIcons/Start Menu Programs.png" alt="All Programs" className="menu-icon" />
            <span className="menu-label">All Programs</span>
            <span className="arrow">▶</span>
          </div>
        </div>

        {/* Right Panel - System */}
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
