"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextType {
  isTransitioning: boolean;
  transitionColor: string;
  startTransition: (href: string, color?: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionColor: 'var(--w-bg)',
  startTransition: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState('var(--w-bg)');

  const startTransition = useCallback((href: string, color?: string) => {
    if (isTransitioning) return;
    setTransitionColor(color || 'var(--w-bg)');
    setIsTransitioning(true);

    // Wait for overlay to cover screen, then navigate
    setTimeout(() => {
      router.push(href);
      window.scrollTo(0, 0);
      // Hold briefly for page mount, then reveal
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 500);
  }, [router, isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, transitionColor, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
