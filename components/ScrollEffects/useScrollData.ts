"use client";

import { useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';

export interface ScrollData {
  scroll: number;
  velocity: number;
  direction: number;
  progress: number;
  isScrolling: boolean;
}

export function useScrollData() {
  const dataRef = useRef<ScrollData>({
    scroll: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
    isScrolling: false,
  });

  useLenis(useCallback((lenis: Lenis) => {
    dataRef.current.scroll = lenis.scroll;
    dataRef.current.velocity = lenis.velocity;
    dataRef.current.direction = lenis.direction;
    dataRef.current.progress = lenis.progress;
    dataRef.current.isScrolling = !!lenis.isScrolling;
  }, []));

  return dataRef;
}
