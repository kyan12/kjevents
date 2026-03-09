"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function resolveThemeColor(pathname: string, scrolled: boolean) {
  const isEvents = pathname.startsWith('/events');
  const isWeddings = pathname.startsWith('/weddings');

  // Events: always match nav fill in browser chrome area.
  if (isEvents) return '#363830';

  // Home split-screen and wedding hero-top should blend with content/no solid strip.
  if (!scrolled) return 'transparent';

  // Match scrolled wedding nav background.
  if (isWeddings) return '#E8E0D4';

  return 'transparent';
}

export default function ThemeColorSync() {
  const pathname = usePathname();

  useEffect(() => {
    const ensureMeta = () => {
      const metas = document.querySelectorAll('meta[name="theme-color"]') as NodeListOf<HTMLMetaElement>;
      if (metas.length > 0) return Array.from(metas);

      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
      return [meta];
    };

    const apply = () => {
      const activePath = window.location.pathname || pathname || '/';
      const scrolled = window.scrollY > 50;
      const color = resolveThemeColor(activePath, scrolled);
      const metas = ensureMeta();
      metas.forEach((m) => m.setAttribute('content', color));
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
