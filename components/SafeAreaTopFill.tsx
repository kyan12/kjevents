"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function getFill(pathname: string, scrolled: boolean) {
  // Events should always match nav fill exactly.
  if (pathname.startsWith('/events')) return '#363830';

  if (!scrolled) return 'transparent';
  if (pathname.startsWith('/weddings')) return '#E8E0D4';
  return 'transparent';
}

export default function SafeAreaTopFill() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [fill, setFill] = useState('transparent');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener('change', updateMobile);
    return () => mq.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    const sync = () => {
      const activePath = window.location.pathname || pathname || '/';
      setFill(getFill(activePath, window.scrollY > 50));
    };

    // Extra post-navigation sync for iOS Safari repaint timing.
    const delayedSync = () => {
      sync();
      requestAnimationFrame(sync);
      setTimeout(sync, 60);
    };

    delayedSync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    window.addEventListener('app-route-transition', delayedSync as EventListener);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      window.removeEventListener('app-route-transition', delayedSync as EventListener);
    };
  }, [pathname]);

  if (!isMobile) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'env(safe-area-inset-top)',
        background: fill,
        zIndex: 101,
        pointerEvents: 'none',
      }}
    />
  );
}
