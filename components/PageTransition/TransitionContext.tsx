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

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    // Mobile: avoid fixed overlay entirely (causes browser address-bar paint artifacts on route changes).
    // Use a lightweight content fade on body instead.
    if (isMobile) {
      document.body.style.transition = 'opacity 350ms ease';
      document.body.style.opacity = '0';

      setTimeout(() => {
        router.push(href);
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('app-route-transition'));

        setTimeout(() => {
          requestAnimationFrame(() => {
            document.body.style.transition = 'opacity 350ms ease';
            document.body.style.opacity = '1';
          });
        }, 300);
      }, 350);

      return;
    }

    setTransitionColor(color || 'var(--w-bg)');
    setIsTransitioning(true);

    // Wait for overlay to cover screen, then navigate
    setTimeout(() => {
      router.push(href);
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('app-route-transition'));
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
