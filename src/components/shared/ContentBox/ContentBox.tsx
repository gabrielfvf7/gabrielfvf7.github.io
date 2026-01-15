import React from 'react';
import './ContentBox.css';

interface ContentBoxProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const ContentBox: React.FC<ContentBoxProps> = ({ 
  title, 
  className = '', 
  children 
}) => {
  return (
    <div className={`content-box ${className}`}>
      {title && <div className="box-title">{title}</div>}
      {children}
    </div>
  );
};

export default ContentBox;
export type { ContentBoxProps };