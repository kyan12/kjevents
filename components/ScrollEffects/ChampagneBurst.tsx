"use client";

import { useRef, useEffect, useCallback } from 'react';
import { useScrollData } from './useScrollData';
import { useIsMobile } from './useIsMobile';
import { BurstSystem } from './particles/BurstSystem';
import styles from './ParticleCanvas.module.css';

export function ChampagneBurst({ sectionIds }: { sectionIds: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollData = useScrollData();
  const isMobile = useIsMobile();
  const burstRef = useRef<BurstSystem>(new BurstSystem());

  const checkSections = useCallback(() => {
    const burst = burstRef.current;
    const vh = window.innerHeight;
    const center = vh / 2;
    const count = isMobile ? 25 : 50;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top - center) < 80) {
        burst.tryBurst(id, window.innerWidth / 2, center, count);
      }
    }
  }, [sectionIds, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    let rafId: number;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const burst = burstRef.current;
      if (scrollData.current.isScrolling) {
        checkSections();
      }
      burst.update(dt);

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (burst.activeCount() > 0) {
        burst.draw(ctx);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, scrollData, checkSections]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
