import { useState, useImperativeHandle, forwardRef } from 'react';
import type { OpenWindow } from '../../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCE } from '../../constants';
import './PortfolioWindow.css';

interface PortfolioWindowProps {
  window: OpenWindow;
  index: number;
  onClose: (id: string) => void;
}

export interface PortfolioWindowRef {
  restore: () => void;
}

export const PortfolioWindow = forwardRef<PortfolioWindowRef, PortfolioWindowProps>(({ window, index, onClose }, ref) => {
  const [activeTab] = useState(window.tab);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const offsetX = 40 + index * 30;
  const offsetY = 60 + index * 30;

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useImperativeHandle(ref, () => ({
    restore: () => {
      if (isMinimized) {
        setIsMinimized(false);
      }
    }
  }));

  const getWindowIcon = () => {
    switch(window.tab) {
      case 'about': return '/icons/User Accounts.png';
      case 'projects': return '/icons/Freecell.png';
      case 'experience': return '/icons/Scheduled Tasks.png';
      case 'skills': return '/icons/System Information.png';
      default: return '/icons/Default.png';
    }
  };

  return (
    <div 
      className={`portfolio-window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{ 
        left: `${offsetX}px`,
        top: `${offsetY}px`,
        zIndex: 100 + index
      }}
    >
      {/* Title Bar */}
      <div className="window-title-bar">
        <img src={getWindowIcon()} alt="" className="window-icon" />
        <div className="window-title">{window.title}</div>
        <div className="window-controls">
          <button 
            aria-label="Minimize" 
            className="window-control-btn minimize-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMinimize();
            }}
          >
            <img src="/Minimize.png" alt="" />
          </button>
          <button 
            aria-label="Maximize" 
            className="window-control-btn maximize-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMaximize();
            }}
          >
            <img src={isMaximized ? "/Restore.png" : "/Maximize.png"} alt="" />
          </button>
          <button 
            aria-label="Close" 
            className="window-control-btn close-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose(window.id);
            }}
          >
            <img src="/Exit.png" alt="" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="window-menu-bar">
        <div className="menu-item">Arquivo</div>
        <div className="menu-item">Exibir</div>
        <div className="menu-item">Favoritos</div>
        <div className="menu-item">Ferramentas</div>
        <div className="menu-item">Ajuda</div>
      </div>

      {/* Window Body */}
      <div className="window-body">
        {/* About Section */}
        {activeTab === 'about' && (
          <div>
            <div className="content-box">
              <div className="box-title">Desenvolvedor</div>
              <div className="mb-3">
                <div className="info-name">{PERSONAL_INFO.name}</div>
                <div className="mb-2">{PERSONAL_INFO.role}</div>
              </div>
              <div className="info-panel">
                <div>{PERSONAL_INFO.summary}</div>
              </div>
              <div className="button-group">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="xp-button">
                  📧 Contato
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="xp-button">
                  GitHub
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="xp-button">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <div>
            <div className="content-box mb-3">
              <div className="project-header">
                <div>
                  <div className="project-name">Rango (TCC)</div>
                  <div className="project-tech">Flutter • Dart</div>
                </div>
              </div>
              <div className="info-panel">
                <div>App desenvolvido em Flutter para a comunidade da UFRJ, facilitando o comércio de refeições entre estudantes.</div>
              </div>
              <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="xp-button">
                Ver Repositório →
              </a>
            </div>

            <div className="content-box">
              <div className="project-header">
                <div>
                  <div className="project-name">Minesweeper XP</div>
                  <div className="project-tech">JavaScript • HTML/CSS</div>
                </div>
              </div>
              <div className="info-panel">
                <div>Clone do Campo Minado clássico. Foco em lógica de algoritmos e manipulação de DOM com JavaScript puro.</div>
              </div>
              <a href="/minado/index.html" target="_blank" className="xp-button">
                Jogar Agora →
              </a>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <div>
            <div className="content-box">
              <div className="box-title">Habilidades</div>
              <div className="skills-grid">
                {SKILLS.map(s => (
                  <div key={s} className="skill-tag">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeTab === 'experience' && (
          <div>
            <div className="experience-list">
              {EXPERIENCE.map((job, i) => (
                <div key={i} className="content-box mb-2">
                  <div className="experience-header">
                    <div className="experience-role">{job.role}</div>
                    <span className="experience-period">{job.period}</span>
                  </div>
                  <div className="experience-company">{job.company}</div>
                  <div className="info-panel">
                    <div>{job.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
