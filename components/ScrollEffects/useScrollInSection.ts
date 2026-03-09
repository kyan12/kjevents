"use client";

import { useRef, useCallback, RefObject } from 'react';
import { useLenis } from 'lenis/react';

export function useScrollInSection(sectionRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef(0);

  useLenis(useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const top = rect.top;
    const height = rect.height;
    const raw = (vh - top) / (vh + height);
    progressRef.current = Math.max(0, Math.min(1, raw));
  }, [sectionRef]));

  return progressRef;
}
