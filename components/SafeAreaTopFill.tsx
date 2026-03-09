"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function getFill(pathname: string, scrolled: boolean) {
  if (!scrolled) return 'transparent';
  if (pathname.startsWith('/events')) return 'rgba(54, 56, 48, 0.94)';
  if (pathname.startsWith('/weddings')) return 'rgba(232, 224, 212, 0.94)';
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
    const sync = () => setFill(getFill(pathname || '/', window.scrollY > 50));
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
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
