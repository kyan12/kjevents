"use client";

import { useRef, useEffect } from 'react';
import { useScrollData } from './useScrollData';
import { useIsMobile } from './useIsMobile';
import { useScrollEffects } from './ScrollEffectsProvider';
import { PetalSystem } from './particles/PetalSystem';
import { ConfettiSystem } from './particles/ConfettiSystem';
import styles from './ParticleCanvas.module.css';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollData = useScrollData();
  const isMobile = useIsMobile();
  const { theme } = useScrollEffects();
  const systemRef = useRef<PetalSystem | ConfettiSystem | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    systemRef.current = theme === 'wedding' ? new PetalSystem() : new ConfettiSystem();

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

      const system = systemRef.current;
      if (!system) { rafId = requestAnimationFrame(loop); return; }

      const w = window.innerWidth;
      const h = window.innerHeight;

      system.spawn(w, h, scrollData.current.velocity);
      system.update(dt);

      ctx.clearRect(0, 0, w, h);
      if (system.activeCount() > 0) {
        system.draw(ctx, w, h);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, theme, scrollData]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
