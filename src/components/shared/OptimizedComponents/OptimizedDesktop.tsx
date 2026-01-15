import React, { memo } from 'react';
import { DesktopContainer } from '../DesktopContainer';

interface OptimizedDesktopProps {
  theme: string;
  onClick: () => void;
  children: React.ReactNode;
}

const OptimizedDesktop = memo<OptimizedDesktopProps>(({ 
  theme, 
  onClick, 
  children 
}) => {
  return (
    <DesktopContainer theme={theme} onClick={onClick}>
      {children}
    </DesktopContainer>
  );
});

OptimizedDesktop.displayName = 'OptimizedDesktop';

export default OptimizedDesktop;