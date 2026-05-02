import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: string;
  children: React.ReactNode;
}

export function CyberBtn({ accent = '#00E5FF', children, className = '', style, ...rest }: Props) {
  return (
    <button
      className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all active:scale-95 ${className}`}
      style={{
        borderColor: accent,
        color: accent,
        background: `rgba(${accent === '#00E5FF' ? '0,229,255' : '0,0,0'},0.08)`,
        boxShadow: `0 0 8px rgba(${accent === '#00E5FF' ? '0,229,255' : '0,0,0'},0.2)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
