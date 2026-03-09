"use client";

import { useEffect } from 'react';

function getThemeColor() {
  return 'transparent';
}

export default function ThemeColorSync() {
  useEffect(() => {
    const color = getThemeColor();
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', color);
  }, []);

  return null;
}
