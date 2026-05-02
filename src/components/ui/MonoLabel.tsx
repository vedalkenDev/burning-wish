import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MonoLabel({ children, className = '' }: Props) {
  return (
    <span className={`font-mono text-[10px] tracking-widest uppercase text-txtMid ${className}`}>
      {children}
    </span>
  );
}
