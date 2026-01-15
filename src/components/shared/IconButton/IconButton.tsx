import React from 'react';
import './IconButton.css';

interface IconButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  variant?: 'minimize' | 'maximize' | 'close' | 'default';
}

export default function IconButton({ 
  onClick, 
  disabled = false, 
  title, 
  children,
  variant = 'default'
}: IconButtonProps) {
  return (
    <button
      className={`icon-button icon-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}

export type { IconButtonProps };