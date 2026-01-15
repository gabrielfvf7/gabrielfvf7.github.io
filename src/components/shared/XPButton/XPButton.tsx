import React from 'react';
import './XPButton.css';
import './XPButton.css';

interface XPButtonProps {
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const XPButton: React.FC<XPButtonProps> = ({
  href,
  onClick,
  target,
  rel,
  className = '',
  children,
  variant = 'primary'
}) => {
  const baseClass = `xp-button xp-button--${variant} ${className}`;
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};