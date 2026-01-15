import React from 'react';

export const ProjectsSection: React.FC = () => {
  return (
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
  );
};
