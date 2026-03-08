"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useScrollInSection } from '@/components/ScrollEffects/useScrollInSection';
import styles from './WeddingPhilosophy.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const progress = useScrollInSection(sectionRef);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (ribbonRef.current) {
        ribbonRef.current.style.setProperty('--shimmer-progress', String(progress.current));
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className={styles.textCol}>
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            ABOUT US
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            We believe every marriage deserves a day that feels like you.
          </motion.h2>
          <motion.div className={styles.accentBlock} custom={2} variants={fadeInUp}>
            <p>
              Kira is the founder of Kira Jia Events, a boutique planning studio specializing in refined weddings that thoughtfully bridge cultures and traditions. With a bicultural background and deep understanding of both Western and Asian celebrations, Kira approaches each wedding with discernment, structure, and a strong sense of storytelling.
            </p>
          </motion.div>
          <motion.p className={styles.bodyText} custom={3} variants={fadeInUp}>
            Drawing from extensive experience in event planning and large-scale production management, she brings a balance of creativity and logistical precision to every celebration. We take on a limited number of couples each year &mdash; by design. Our process is intentional, our attention is total, and the results are unlike anyone else&rsquo;s celebration.
          </motion.p>
          <motion.p className={styles.signature} custom={4} variants={fadeInUp}>
            Kira Jia
          </motion.p>
          <motion.p className={styles.signatureRole} custom={4.5} variants={fadeInUp}>
            FOUNDER & LEAD PLANNER
          </motion.p>
        </div>

        <motion.div className={styles.photoCol} custom={1.5} variants={fadeInUp}>
          {/* Organic Sheer Wavy Cloth Ribbon on Left Edge */}
          <div className={styles.leftRibbonOverlay}>
            <svg
              viewBox="0 0 100 200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                {/* Blur filter for feathering the outer edge into the background */}
                <filter id="featheringBlend" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
                <filter id="lightDropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="0" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
                </filter>
                {/* Gradients that merge into the cream background on the left and trail off translucent on the right */}
                <linearGradient id="solidToSheer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-bg)" stopOpacity="1" />
                  <stop offset="30%" stopColor="var(--w-bg)" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="var(--w-cream)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--w-cream)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerFold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-cream)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--w-cream)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--w-cream)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Base block that completely feathers into background on the left edge */}
              <rect x="-10" y="-10" width="30" height="220" fill="var(--w-bg)" filter="url(#featheringBlend)" />

              {/* Main fabric drape with highly organic curves */}
              <path
                d="M 0,-10 L 45,-10 C 65,40  25,80   55,120 C 75,150  35,180  45,210 L 0,210 Z"
                fill="url(#solidToSheer)"
                filter="url(#featheringBlend)"
              />

              {/* Primary textured fold overlapping */}
              <path
                d="M 0,-10 L 55,-10 C 85,20  35,90   70,140 C 95,170  45,190  55,210 L 0,210 Z"
                fill="url(#sheerFold)"
                filter="url(#lightDropShadow)"
              />

              {/* Secondary flowing highlight / sheer fold */}
              <path
                d="M 0,-10 L 70,-10 C 100,50  50,110  85,160 C 105,190  65,200  80,210 L 0,210 Z"
                fill="url(#sheerHighlight)"
                opacity="0.8"
                filter="url(#featheringBlend)"
              />

              {/* Fine trailing edge detail */}
              <path
                d="M 0,-10 L 80,-10 C 120,60  60,130  95,170 C 115,200  75,205  90,210 L 0,210 Z"
                fill="url(#sheerFold)"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className={styles.photoPrimary}>
            <Image
              src="/images/kira_portrait.jpg"
              alt="Kira Jia"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              priority
            />
            <div className={styles.vignette} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
