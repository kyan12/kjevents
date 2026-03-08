"use client";

import { useRef, useEffect, RefObject } from 'react';
import {
  STEM_MAIN, PEONY_PETALS, LEAF_1,
  BRANCH_LEFT, RANUNCULUS, LEAF_2A, LEAF_2B,
  BRANCH_RIGHT, BUD_PETALS, EUCALYPTUS, FERN,
  RIBBON_WRAP_1, RIBBON_WRAP_2, BOW_LEFT, BOW_RIGHT, BOW_CENTER,
  BABY_BREATH_DOTS, PETAL_DETAILS, GLOW_CENTER,
} from './bouquetPaths';

interface BouquetSVGProps {
  activeStep: number;
  progressRef: RefObject<{ total: number; sub: number; throw: number; complete: boolean }>;
  static?: boolean;
}

export default function BouquetSVG({
  activeStep, progressRef, static: staticMode,
}: BouquetSVGProps) {
  const layerRefs = useRef<(SVGGElement | null)[]>([null, null, null, null, null]);
  const cachedPaths = useRef<SVGPathElement[][]>([]);
  const lengthCache = useRef<WeakMap<SVGPathElement, number>>(new WeakMap());
  const initialized = useRef(false);
  const rafRef = useRef<number>(0);

  // Cache paths and set initial dasharray after mount
  useEffect(() => {
    if (initialized.current) return;
    cachedPaths.current = [];
    for (let layerIdx = 0; layerIdx < 5; layerIdx++) {
      const g = layerRefs.current[layerIdx];
      if (!g) { cachedPaths.current.push([]); continue; }
      const paths = Array.from(g.querySelectorAll<SVGPathElement>('path'));
      for (const path of paths) {
        const len = path.getTotalLength();
        lengthCache.current.set(path, len);
        path.style.strokeDasharray = `${len}`;
        if (staticMode) {
          path.style.strokeDashoffset = '0';
          path.style.opacity = '1';
        } else {
          path.style.strokeDashoffset = `${len}`;
          path.style.opacity = layerIdx === 0 ? '1' : '0.15';
        }
      }
      cachedPaths.current.push(paths);
    }
    initialized.current = true;
  }, [staticMode]);

  // RAF loop to read progressRef and update paths
  useEffect(() => {
    if (staticMode || !initialized.current) return;

    const tick = () => {
      const p = progressRef.current;
      for (let layerIdx = 0; layerIdx < 5; layerIdx++) {
        const paths = cachedPaths.current[layerIdx];
        if (!paths) continue;
        for (const path of paths) {
          const length = lengthCache.current.get(path);
          if (length === undefined) continue;
          if (layerIdx < activeStep) {
            path.style.strokeDashoffset = '0';
            path.style.opacity = '1';
          } else if (layerIdx > activeStep) {
            path.style.strokeDashoffset = `${length}`;
            path.style.opacity = '0.15';
          } else {
            path.style.opacity = '1';
            path.style.strokeDashoffset = `${length * (1 - p.sub)}`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [staticMode, activeStep, progressRef]);

  const burgundy = 'var(--w-burgundy)';
  const burgundyLt = 'var(--w-burgundy-lt)';
  const ash = 'var(--w-ash)';
  const cream = 'var(--w-cream)';

  return (
    <svg viewBox="0 0 300 400" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Glow (layer 5 preview) */}
      <radialGradient id="bouquetGlow">
        <stop offset="0%" stopColor={burgundy} stopOpacity={activeStep >= 4 || staticMode ? 0.08 : 0} />
        <stop offset="100%" stopColor={burgundy} stopOpacity="0" />
      </radialGradient>
      <circle
        cx={GLOW_CENTER.cx} cy={GLOW_CENTER.cy} r={GLOW_CENTER.r}
        fill="url(#bouquetGlow)"
        style={{ transition: 'opacity 0.6s ease' }}
      />

      {/* Layer 0: Consultation — Stem + Peony + Leaf */}
      <g ref={el => { layerRefs.current[0] = el; }}>
        <path d={STEM_MAIN} stroke={ash} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {PEONY_PETALS.map((d, i) => (
          <path key={`p1-${i}`} d={d} stroke={burgundy} strokeWidth={1.5} fill="rgba(107,51,51,0.05)" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <path d={LEAF_1} stroke={ash} strokeWidth={1.5} fill="rgba(122,110,101,0.08)" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Layer 1: Vision & Design — Branch left + Ranunculus + Leaves */}
      <g ref={el => { layerRefs.current[1] = el; }}>
        <path d={BRANCH_LEFT} stroke={ash} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {RANUNCULUS.map((d, i) => (
          <path key={`r-${i}`} d={d} stroke={burgundyLt} strokeWidth={1.5} fill="rgba(140,74,74,0.05)" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <path d={LEAF_2A} stroke={ash} strokeWidth={1.5} fill="rgba(122,110,101,0.08)" strokeLinecap="round" strokeLinejoin="round" />
        <path d={LEAF_2B} stroke={ash} strokeWidth={1.5} fill="rgba(122,110,101,0.08)" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Layer 2: Vendor Curation — Branch right + Bud + Eucalyptus + Fern */}
      <g ref={el => { layerRefs.current[2] = el; }}>
        <path d={BRANCH_RIGHT} stroke={ash} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {BUD_PETALS.map((d, i) => (
          <path key={`b-${i}`} d={d} stroke={burgundy} strokeWidth={1.5} fill="rgba(107,51,51,0.05)" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {EUCALYPTUS.map((d, i) => (
          <path key={`e-${i}`} d={d} stroke={ash} strokeWidth={1.5} fill="rgba(122,110,101,0.06)" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <path d={FERN} stroke={ash} strokeWidth={1.5} fill="rgba(122,110,101,0.06)" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Layer 3: Planning — Ribbon + Bow */}
      <g ref={el => { layerRefs.current[3] = el; }}>
        <path d={RIBBON_WRAP_1} stroke={burgundy} strokeWidth={1.2} fill={cream} strokeLinecap="round" strokeLinejoin="round" />
        <path d={RIBBON_WRAP_2} stroke={burgundy} strokeWidth={1.2} fill={cream} strokeLinecap="round" strokeLinejoin="round" />
        <path d={BOW_LEFT} stroke={burgundy} strokeWidth={1.5} fill={cream} strokeLinecap="round" strokeLinejoin="round" />
        <path d={BOW_RIGHT} stroke={burgundy} strokeWidth={1.5} fill={cream} strokeLinecap="round" strokeLinejoin="round" />
        <path d={BOW_CENTER} stroke={burgundy} strokeWidth={1.5} fill={burgundy} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Layer 4: Wedding Day — Baby's breath + Petal details */}
      <g ref={el => { layerRefs.current[4] = el; }}>
        {BABY_BREATH_DOTS.map((dot, i) => (
          <circle
            key={`bb-${i}`}
            cx={dot.cx} cy={dot.cy} r={2}
            fill={burgundyLt}
            style={{
              opacity: (activeStep >= 4 || staticMode) ? 0.7 : 0.05,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
        {PETAL_DETAILS.map((d, i) => (
          <path key={`pd-${i}`} d={d} stroke={burgundyLt} strokeWidth={0.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
    </svg>
  );
}
