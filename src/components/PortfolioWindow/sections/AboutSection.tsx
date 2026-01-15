import React from 'react';
import { PERSONAL_INFO } from '../../../constants';
import ContentBox from '../../shared/ContentBox';
import XPButton from '../../shared/XPButton';

export const AboutSection: React.FC = () => {
  return (
    <ContentBox title="Desenvolvedor">
      <div className="mb-3">
        <div className="info-name">{PERSONAL_INFO.name}</div>
        <div className="mb-2">{PERSONAL_INFO.role}</div>
      </div>
      <div className="info-panel">
        <div>{PERSONAL_INFO.summary}</div>
      </div>
      <div className="button-group">
        <XPButton href={`mailto:${PERSONAL_INFO.email}`}>
          📧 Contato
        </XPButton>
        <XPButton href={PERSONAL_INFO.github} target="_blank">
          GitHub
        </XPButton>
        <XPButton href={PERSONAL_INFO.linkedin} target="_blank">
          LinkedIn
        </XPButton>
      </div>
    </ContentBox>
  );
};
