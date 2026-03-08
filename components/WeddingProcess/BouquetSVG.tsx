"use client";

import { RefObject } from 'react';
import { motion } from 'framer-motion';
import styles from './WeddingProcess.module.css';

interface BouquetSVGProps {
  activeStep: number;
  progressRef: RefObject<{ total: number; sub: number; throw: number; complete: boolean }>;
  static?: boolean;
}

export default function BouquetSVG({ activeStep }: BouquetSVGProps) {
  const burgundy = 'var(--w-burgundy)';
  const burgundyLt = 'var(--w-burgundy-lt)';
  const ash = 'var(--w-ash)';
  const cream = 'var(--w-cream)';
  const flowerVariants = {
    step0: { x: 150, y: 225, scale: 1, rotate: 5 },
    step1: { x: 120, y: 180, scale: 1.1, rotate: -15 },
    step2: { x: 160, y: 240, scale: 1.4, rotate: 10 },
    step3: { x: 160, y: 150, scale: 1.2, rotate: -5 },
    step4: { x: 150, y: 140, scale: 1.8, rotate: 0 },
  };

  const activeKey = `step${activeStep}`;

  const CoreFlower = () => (
    <motion.g
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="0" cy="0" r="14" fill={burgundy} opacity={0.85} />
      <circle cx="-15" cy="10" r="10" fill={burgundyLt} opacity={0.7} />
      <circle cx="15" cy="10" r="10" fill={burgundyLt} opacity={0.7} />
      <circle cx="0" cy="0" r="4" fill={cream} />
    </motion.g>
  );

  return (
    <svg viewBox="0 0 300 400" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Background glow */}
      <radialGradient id="bouquetGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={burgundy} stopOpacity={0.05} />
        <stop offset="100%" stopColor={burgundy} stopOpacity="0" />
      </radialGradient>
      <circle cx="150" cy="200" r="140" fill="url(#bouquetGlow)" />

      {/* Layer 0: Hairpiece */}
      <g style={{ opacity: activeStep === 0 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M 90 300 C 110 200, 190 200, 210 300" fill="none" stroke={ash} strokeWidth={2} />
          <path d="M 115 300 C 130 220, 170 220, 185 300" fill="none" stroke={ash} strokeWidth={1} />
        </motion.g>
      </g>

      {/* Layer 1: Mood Board */}
      <g style={{ opacity: activeStep === 1 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        <rect x="60" y="80" width="180" height="240" fill={cream} stroke={ash} strokeWidth={1.5} />
        <motion.rect x="80" y="100" width="60" height="80" fill="rgba(122,110,101,0.15)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.rect x="155" y="100" width="65" height="110" fill="rgba(107,51,51,0.1)" animate={{ opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 4, repeat: Infinity }} />
        <rect x="80" y="195" width="60" height="105" fill="rgba(242,237,230,0.8)" stroke={ash} strokeWidth={0.5} />
        <circle cx="120" cy="180" r="4" fill={cream} stroke={ash} strokeWidth={0.5} />
      </g>

      {/* Layer 2: Swatches */}
      <g style={{ opacity: activeStep === 2 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        <motion.path d="M 40 220 Q 150 170 260 240 L 260 360 Q 150 330 40 360 Z" fill="rgba(107,51,51,0.08)" stroke={burgundyLt} strokeWidth={1} animate={{ skewX: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity }} />
        <path d="M 70 180 Q 180 200 280 160 L 280 280 Q 180 340 70 300 Z" fill={cream} stroke={ash} strokeWidth={1} />
      </g>

      {/* Layer 3: Vase & Window Timelapse */}
      <g style={{ opacity: activeStep === 3 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        <rect x="50" y="60" width="200" height="260" fill="none" stroke={ash} strokeWidth={2} />
        <line x1="150" y1="60" x2="150" y2="320" stroke={ash} strokeWidth={1.5} />
        <line x1="50" y1="190" x2="250" y2="190" stroke={ash} strokeWidth={1.5} />
        <clipPath id="windowClip">
          <rect x="50" y="60" width="200" height="260" />
        </clipPath>
        <g clipPath="url(#windowClip)">
          <motion.circle
            r="24"
            fill={burgundyLt}
            opacity={0.3}
            animate={activeStep === 3 ? { cx: [-50, 350], cy: [250, 50] } : { cx: -50, cy: 250 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <rect x="40" y="320" width="220" height="12" fill={ash} />
        <path d="M 130 320 L 140 250 L 160 250 L 170 320 Z" fill={cream} stroke={ash} strokeWidth={1} />
        <path d="M 150 250 Q 140 180 160 150" fill="none" stroke={burgundy} strokeWidth={2} />
      </g>

      {/* Layer 4: Bouquet Toss Spray */}
      <g style={{ opacity: activeStep === 4 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        <path d="M 142 300 L 130 350 M 158 300 L 170 345" stroke={burgundyLt} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M 140 350 L 160 350 L 155 240 L 145 240 Z" fill={cream} stroke={ash} strokeWidth={1} />

        {/* Continuous flying tossed flowers */}
        {[
          { x: 50, y: -60, s: 0.8, d: 0 },
          { x: -70, y: -120, s: 0.5, d: 0.8 },
          { x: 90, y: -180, s: 1.1, d: 1.5 },
          { x: -30, y: -200, s: 0.7, d: 2.1 },
          { x: 120, y: -100, s: 0.6, d: 2.8 },
        ].map((t, i) => (
          <motion.g
            key={`toss-${i}`}
            initial={{ x: 150, y: 140, scale: 0, opacity: 0 }}
            animate={activeStep === 4 ? {
              x: 150 + t.x,
              y: 140 + t.y,
              scale: t.s,
              opacity: [0, 1, 0],
              rotate: t.x
            } : { x: 150, y: 140, scale: 0, opacity: 0 }}
            transition={activeStep === 4 ? {
              duration: 4,
              repeat: Infinity,
              delay: t.d,
              ease: "easeOut"
            } : { duration: 0 }}
          >
            <circle cx="0" cy="0" r="14" fill={burgundy} opacity={0.6} />
            <circle cx="-10" cy="8" r="10" fill={burgundyLt} opacity={0.5} />
            <circle cx="10" cy="8" r="10" fill={burgundyLt} opacity={0.5} />
          </motion.g>
        ))}
      </g>

      {/* The Core Persisting Morphing Flower */}
      <motion.g
        variants={flowerVariants}
        initial="step0"
        animate={activeKey}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        style={{ pointerEvents: 'none' }}
      >
        <CoreFlower />
      </motion.g>
    </svg>
  );
}
