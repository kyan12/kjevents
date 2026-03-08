"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

const STEP_DURATION = 3000; // ms per step

export interface StepProgressResult {
  activeStep: number;
  progressRef: React.RefObject<{ total: number; sub: number; throw: number; complete: boolean }>;
  start: () => void;
  jumpTo: (step: number) => void;
}

export function useStepProgress(stepCount: number): StepProgressResult {
  const [activeStep, setActiveStep] = useState(0);
  const progressRef = useRef({ total: 0, sub: 0, throw: 0, complete: false });
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const runningRef = useRef(false);
  const stepRef = useRef(0);

  const animate = useCallback((timestamp: number) => {
    if (!runningRef.current) return;
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const elapsed = timestamp - startTimeRef.current;
    const sub = Math.min(1, elapsed / STEP_DURATION);
    const totalElapsed = stepRef.current * STEP_DURATION + elapsed;
    const totalDuration = stepCount * STEP_DURATION;
    const total = Math.min(1, totalElapsed / totalDuration);

    const p = progressRef.current;
    p.sub = sub;
    p.total = total;
    p.throw = total > 0.83 ? Math.min(1, (total - 0.83) / 0.17) : 0;
    p.complete = total >= 0.99;

    if (elapsed >= STEP_DURATION && stepRef.current < stepCount - 1) {
      stepRef.current += 1;
      startTimeRef.current = timestamp;
      setActiveStep(stepRef.current);
    }

    if (stepRef.current < stepCount - 1 || sub < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      p.sub = 1;
      p.total = 1;
      p.complete = true;
      p.throw = 1;
    }
  }, [stepCount]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    stepRef.current = 0;
    startTimeRef.current = 0;
    setActiveStep(0);
    progressRef.current = { total: 0, sub: 0, throw: 0, complete: false };
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const jumpTo = useCallback((targetStep: number) => {
    setActiveStep(targetStep);
    stepRef.current = targetStep;
    startTimeRef.current = 0; // Reset local elapsed timer for the new step
    if (!runningRef.current) start(); // Ensure it runs if clicked before scrolling
  }, [start]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return { activeStep, progressRef, start, jumpTo };
}
