import React, { memo } from 'react';
import { DesktopContainer } from '../../Desktop/Desktop';

interface OptimizedDesktopProps {
  onClick: () => void;
  children: React.ReactNode;
}

const OptimizedDesktop = memo<OptimizedDesktopProps>(({ 
  onClick, 
  children 
}) => {
  return (
    <DesktopContainer onDesktopClick={onClick}>
      {children}
    </DesktopContainer>
  );
});

OptimizedDesktop.displayName = 'OptimizedDesktop';

export default OptimizedDesktop;