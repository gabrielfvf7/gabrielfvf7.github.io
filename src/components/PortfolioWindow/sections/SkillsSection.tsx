import React from 'react';
import { SKILLS } from '../../../constants';

export const SkillsSection: React.FC = () => {
  return (
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
  );
};
