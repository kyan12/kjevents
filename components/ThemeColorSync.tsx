"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getThemeColor(pathname: string) {
  if (pathname.startsWith('/events')) return '#F9F6F0';
  if (pathname.startsWith('/weddings')) return '#E8E0D4';
  return '#E8E0D4';
}

export default function ThemeColorSync() {
  const pathname = usePathname();

  useEffect(() => {
    const color = getThemeColor(pathname || '/');
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', color);
  }, [pathname]);

  return null;
}
