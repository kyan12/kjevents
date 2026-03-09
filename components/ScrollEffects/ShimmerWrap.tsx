"use client";

import { useRef, ReactNode } from 'react';
import { useScrollInSection } from './useScrollInSection';
import styles from './ShimmerWrap.module.css';

interface ShimmerWrapProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerWrap({ children, className }: ShimmerWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollInSection(ref);

  return (
    <div
      ref={ref}
      className={`${styles.shimmer} ${className || ''}`}
      style={{ '--shimmer-progress': progress.current } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
