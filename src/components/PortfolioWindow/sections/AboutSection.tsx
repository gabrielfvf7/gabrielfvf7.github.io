import React from 'react';
import { PERSONAL_INFO } from '../../../constants';

export const AboutSection: React.FC = () => {
  return (
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
  );
};
