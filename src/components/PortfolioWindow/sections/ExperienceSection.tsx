import React from 'react';
import { EXPERIENCE } from '../../../constants';

export const ExperienceSection: React.FC = () => {
  return (
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
  );
};
