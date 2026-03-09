"use client";

import { ReactNode } from 'react';
import { useTransition } from './TransitionContext';

interface TransitionLinkProps {
  href: string;
  color?: string;
  className?: string;
  children: ReactNode;
}

export default function TransitionLink({ href, color, className, children }: TransitionLinkProps) {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(href, color);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
