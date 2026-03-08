"use client";

import { useState, useRef, useCallback, RefObject } from 'react';
import { useLenis } from 'lenis/react';

interface StepProgress {
  activeStep: number;
  progressRef: RefObject<{ total: number; sub: number; throw: number; complete: boolean }>;
}

export function useStepProgress(
  sectionRef: RefObject<HTMLElement | null>,
  stepCount: number,
  enabled: boolean,
): StepProgress {
  const [activeStep, setActiveStep] = useState(0);
  const prevStepRef = useRef(0);
  const progressRef = useRef({ total: 0, sub: 0, throw: 0, complete: false });

  useLenis(useCallback(() => {
    if (!enabled || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;

    const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    const p = progressRef.current;
    p.total = rawProgress;

    const step = Math.min(stepCount - 1, Math.floor(rawProgress * stepCount));
    if (step !== prevStepRef.current) {
      prevStepRef.current = step;
      setActiveStep(step);
    }

    const stepSize = 1 / stepCount;
    const stepStart = step * stepSize;
    p.sub = Math.min(1, (rawProgress - stepStart) / stepSize);

    const throwStart = 0.83;
    p.throw = rawProgress > throwStart
      ? Math.min(1, (rawProgress - throwStart) / (1 - throwStart))
      : 0;
    p.complete = rawProgress >= 0.99;
  }, [enabled, sectionRef, stepCount]));

  return { activeStep, progressRef };
}
