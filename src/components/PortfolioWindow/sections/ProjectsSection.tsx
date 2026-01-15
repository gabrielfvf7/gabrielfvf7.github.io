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
        <div>App desenvolvido em Flutter, com uso do Firebase, para a comunidade da UFRJ, facilitando o comércio de refeições entre estudantes e vendedores.</div>
      </div>
      <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="project-link">
        Ver Repositório →
      </a>
    </div>
  );
};
