"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function resolveThemeColor(pathname: string, scrolled: boolean) {
  const isEvents = pathname.startsWith('/events');
  const isWeddings = pathname.startsWith('/weddings');

  // Home split-screen and hero-top states should blend with content/no solid strip.
  if (!scrolled) return 'transparent';

  // Match scrolled nav backgrounds exactly (solid approximation of rgba colors).
  if (isEvents) return '#363830';
  if (isWeddings) return '#E8E0D4';

  return 'transparent';
}

export default function ThemeColorSync() {
  const pathname = usePathname();

  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    const apply = () => {
      const scrolled = window.scrollY > 50;
      const color = resolveThemeColor(pathname || '/', scrolled);
      meta!.setAttribute('content', color);
    };

    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, [pathname]);

  return null;
}
