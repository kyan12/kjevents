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
    step0: { x: 75, y: 140, scale: 0.9, rotate: 0 },
    step1: { x: 120, y: 165, scale: 1.1, rotate: 0 },
    step2: { x: 155, y: 215, scale: 1.4, rotate: 0 },
    step3: { x: 160, y: 160, scale: 1.2, rotate: 0 },
    step4: { x: 150, y: 70, scale: 1.8, rotate: 0 },
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

      {/* Layer 0: Consultation (Couple on Couch) */}
      <g style={{ opacity: activeStep === 0 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} transform="translate(0, -60)">
        <motion.g animate={{ y: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          {/* Curved Modern Couch Back & Seat */}
          <path d="M 40 320 Q 150 280 260 320" fill="none" stroke={ash} strokeWidth={3} />
          <path d="M 50 350 Q 150 330 250 350" fill="none" stroke={ash} strokeWidth={2} />
          <path d="M 40 320 Q 30 335 50 350" fill="none" stroke={ash} strokeWidth={2} />
          <path d="M 260 320 Q 270 335 250 350" fill="none" stroke={ash} strokeWidth={2} />

          {/* Client (Left) - Sitting on couch angled forward */}
          <g>
            {/* Body */}
            <path d="M 70 330 C 70 250, 110 230, 120 280" fill="rgba(242,237,230,0.8)" stroke={ash} strokeWidth={1.5} />
            {/* Head */}
            <circle cx="95" cy="205" r="22" fill={cream} stroke={ash} strokeWidth={1.5} />
            {/* Hair/Bun (Where the flower goes) */}
            <circle cx="75" cy="200" r="14" fill="none" stroke={ash} strokeWidth={1.5} />
            {/* Arm resting naturally or gesturing */}
            <path d="M 120 260 Q 140 290 130 310" fill="none" stroke={ash} strokeWidth={1.5} />
          </g>

          {/* Planner (Right) - Sitting on couch facing client */}
          <g>
            {/* Body */}
            <path d="M 230 330 C 230 240, 190 230, 180 280" fill="rgba(107,51,51,0.05)" stroke={ash} strokeWidth={1.5} />
            {/* Head */}
            <circle cx="205" cy="195" r="20" fill={cream} stroke={ash} strokeWidth={1.5} />
            {/* Arm holding notebook on lap */}
            <path d="M 180 260 Q 155 290 160 310" fill="none" stroke={ash} strokeWidth={1.5} />
            {/* Planner's Notebook (resting on lap) */}
            <rect x="150" y="295" width="25" height="15" transform="rotate(-15 150 300) skewX(10)" fill={cream} stroke={ash} strokeWidth={1} />
          </g>
        </motion.g>
      </g>

      {/* Layer 1: Vision & Design (Easel and Board) */}
      <g style={{ opacity: activeStep === 1 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} transform="translate(0, -15)">
        {/* Easel Stand */}
        <line x1="150" y1="50" x2="150" y2="350" stroke={ash} strokeWidth={3} />
        <line x1="150" y1="200" x2="90" y2="380" stroke={ash} strokeWidth={3} />
        <line x1="150" y1="200" x2="210" y2="380" stroke={ash} strokeWidth={3} />
        {/* Presentation Board */}
        <rect x="50" y="80" width="200" height="140" fill={cream} stroke={ash} strokeWidth={2} />
        <motion.rect x="65" y="95" width="80" height="50" fill="rgba(122,110,101,0.15)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.rect x="155" y="95" width="80" height="110" fill="rgba(107,51,51,0.1)" animate={{ opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 4, repeat: Infinity }} />
        <rect x="65" y="155" width="80" height="50" fill="rgba(242,237,230,0.8)" stroke={ash} strokeWidth={0.5} />
      </g>

      {/* Layer 2: Vendor Curation (Artistic Dossier Collage) */}
      <g style={{ opacity: activeStep === 2 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} transform="translate(0, -5)">
        <motion.path d="M 60 180 Q 80 130 120 150 Q 150 170 150 220 Q 150 280 100 270 Q 50 260 60 180 Z" fill="rgba(242,237,230,0.6)" stroke={ash} strokeWidth={1} animate={{ rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.rect x="50" y="200" width="80" height="90" fill="none" stroke={ash} strokeWidth={1.5} transform="rotate(-10 90 245)" animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
        <motion.path d="M 180 150 Q 220 120 250 160 T 260 250 T 190 260 Z" fill="rgba(107,51,51,0.05)" stroke={burgundyLt} strokeWidth={1} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.rect x="170" y="180" width="70" height="100" fill={cream} stroke={ash} strokeWidth={1} transform="rotate(15 205 230)" animate={{ y: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} />

        {/* Central curated piece */}
        <motion.g animate={{ y: [-5, -10, -5], scale: [1.02, 1.05, 1.02] }} transition={{ duration: 4, repeat: Infinity }}>
          <path d="M 110 130 L 190 130 L 200 250 L 100 250 Z" fill={cream} stroke={ash} strokeWidth={1.5} />
          <path d="M 120 150 L 180 150 L 185 200 L 115 200 Z" fill="rgba(122,110,101,0.1)" />
          {/* Elegant squiggles/accents inside */}
          <path d="M 130 220 Q 150 210 170 230" fill="none" stroke={ash} strokeWidth={1} />
        </motion.g>
      </g>

      {/* Layer 3: Vase & Window Timelapse */}
      <g style={{ opacity: activeStep === 3 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} transform="translate(0, 10)">
        <rect x="50" y="60" width="200" height="260" fill="none" stroke={ash} strokeWidth={2} />
        <line x1="150" y1="60" x2="150" y2="320" stroke={ash} strokeWidth={1.5} />
        <line x1="50" y1="190" x2="250" y2="190" stroke={ash} strokeWidth={1.5} />
        <clipPath id="windowClip">
          <rect x="50" y="60" width="200" height="260" />
        </clipPath>
        <g clipPath="url(#windowClip)">
          {/* Duration changed to 6s to match full cycle within the new step time */}
          <motion.circle
            cx="-50"
            cy="250"
            r="24"
            fill={burgundyLt}
            opacity={0.3}
            initial={{ cx: -50, cy: 250 }}
            animate={activeStep === 3 ? { cx: [-50, 350], cy: [250, 50] } : { cx: -50, cy: 250 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <rect x="40" y="320" width="220" height="12" fill={ash} />
        <path d="M 130 320 L 140 250 L 160 250 L 170 320 Z" fill={cream} stroke={ash} strokeWidth={1} />
        <path d="M 150 250 Q 140 180 160 150" fill="none" stroke={burgundy} strokeWidth={2} />
      </g>

      {/* Layer 4: Bouquet Toss Spray */}
      <g style={{ opacity: activeStep === 4 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} transform="translate(0, -70)">
        {/* Bouquet Base / Ribbon Stems with depth shadow */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: activeStep === 4 ? 1 : 0 }} transition={{ duration: 1, delay: 0.5 }}>
          {/* Shadow Behind Bouquet Leaves */}
          <path d="M 120 180 Q 150 250 180 180 Z" fill="rgba(107,51,51,0.05)" />
          {/* Stems */}
          <path d="M 145 150 L 135 240 M 155 150 L 165 240 M 150 150 L 150 250" stroke={ash} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.8} />
          {/* Trailing Ribbon */}
          <path d="M 120 190 Q 150 220 180 190 T 170 260" fill="none" stroke={cream} strokeWidth={5} strokeLinecap="round" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.05))" />
          <path d="M 130 210 Q 140 240 145 270" fill="none" stroke={cream} strokeWidth={3} strokeLinecap="round" />
        </motion.g>

        {/* Recognizable Crowd Forms (Heads, Shoulders, Joined Arms) */}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {/* Person 1 (Far Left) */}
          <path d="M 30 400 C 30 360, 40 340, 50 340 C 60 340, 70 360, 70 400" fill="rgba(242,237,230,0.4)" stroke={ash} strokeWidth={1.5} />
          <circle cx="50" cy="325" r="15" fill={cream} stroke={ash} strokeWidth={1.5} />
          {/* Reaching arm */}
          <path d="M 60 360 Q 80 340 90 310" fill="none" stroke={ash} strokeWidth={1.5} strokeLinecap="round" />
        </motion.g>

        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}>
          {/* Person 2 (Center, Jumping) */}
          <path d="M 110 400 C 110 320, 130 300, 145 300 C 160 300, 180 320, 180 400" fill="rgba(107,51,51,0.03)" stroke={ash} strokeWidth={1.5} />
          <circle cx="145" cy="282" r="18" fill={cream} stroke={ash} strokeWidth={1.5} />
          {/* Both Arms reaching high */}
          <path d="M 125 320 Q 110 290 120 250" fill="none" stroke={ash} strokeWidth={1.5} strokeLinecap="round" />
          <path d="M 165 320 Q 180 290 170 250" fill="none" stroke={ash} strokeWidth={1.5} strokeLinecap="round" />
        </motion.g>

        <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}>
          {/* Person 3 (Right Center) */}
          <path d="M 190 400 C 190 340, 205 325, 220 325 C 235 325, 250 340, 250 400" fill="rgba(242,237,230,0.6)" stroke={ash} strokeWidth={1.5} />
          <circle cx="220" cy="309" r="16" fill={cream} stroke={ash} strokeWidth={1.5} />
          {/* Reaching arm */}
          <path d="M 205 340 Q 190 320 185 280" fill="none" stroke={ash} strokeWidth={1.5} strokeLinecap="round" />
        </motion.g>

        {/* Continuous flying tossed flowers towards the crowd */}
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
