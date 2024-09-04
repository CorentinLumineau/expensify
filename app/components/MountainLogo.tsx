import React from 'react';

interface MountainLogoProps {
  className?: string;
}

export function MountainLogo({ className = "w-8 h-8" }: MountainLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 20L14.5 7L10.5 13.5L8.5 10.5L2 20H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}