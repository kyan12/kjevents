"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import { useIsMobile } from './useIsMobile';
import styles from './HorizontalScrollSection.module.css';

interface HorizontalScrollSectionProps {
  children: ReactNode;
  panelCount: number;
}

export function HorizontalScrollSection({ children, panelCount }: HorizontalScrollSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLenis(() => {
    if (isMobile || !outerRef.current || !trackRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const scrollHeight = outerRef.current.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
    const maxTranslate = (panelCount - 1) * 100;
    trackRef.current.style.transform = `translateX(-${progress * maxTranslate}vw)`;
  });

  useEffect(() => {
    // Ensure proper paint on mount
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileScroll}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={styles.outer}
      style={{ height: `${panelCount * 100}vh` }}
    >
      <div className={styles.sticky}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{ width: `${panelCount * 100}vw` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
