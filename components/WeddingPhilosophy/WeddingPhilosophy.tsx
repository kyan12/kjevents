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
          {/* Organic Sheer Wavy Cloth Ribbon Mirrored Onto Itself */}
          <div className={styles.leftRibbonOverlay}>
            <svg
              viewBox="-100 0 200 200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                {/* Blur filter for feathering the outer edge into the background */}
                <filter id="featheringBlend" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
                <filter id="lightDropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="1" stdDeviation="3" floodColor="#000" floodOpacity="0.08" />
                </filter>
                <filter id="deepDropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="4" dy="2" stdDeviation="5" floodColor="#000" floodOpacity="0.12" />
                </filter>

                {/* Fabric noise texture */}
                <filter id="fabricNoise" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.8" numOctaves="2" result="noise" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" in="noise" result="alphaNoise" />
                  <feComposite operator="in" in="alphaNoise" in2="SourceGraphic" result="texture" />
                  <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
                </filter>

                {/* Gradients that merge into the cream background on the left and trail off translucent on the right */}
                <linearGradient id="solidToSheer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-bg)" stopOpacity="1" />
                  <stop offset="25%" stopColor="var(--w-bg)" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="var(--w-bg)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--w-bg)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerFold1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-bg)" stopOpacity="0" />
                  <stop offset="40%" stopColor="var(--w-bg)" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="var(--w-bg)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--w-bg)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerFold2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-bg)" stopOpacity="0" />
                  <stop offset="30%" stopColor="var(--w-bg)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--w-bg)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--w-bg)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--w-bg)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--w-bg)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sheerShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Base background layer that completely blends into the center. */}
              {/* It acts as the solid foundation for the actual photo edge behind it */}
              <rect x="-20" y="-10" width="40" height="220" fill="var(--w-bg)" />

              <g filter="url(#fabricNoise)">
                {/* Main fabric drape sweeping across (Right side) */}
                <path
                  d="M 0,-10 L 40,-10 C 70,50  10,90   50,140 C 80,180  25,195  35,210 L 0,210 Z"
                  fill="url(#solidToSheer)"
                  filter="url(#featheringBlend)"
                />

                {/* Deep background fold shadow */}
                <path
                  d="M 0,-10 L 50,-10 C 90,40  20,100  65,150 C 95,190  35,200  45,210 L 0,210 Z"
                  fill="url(#sheerShadow)"
                  filter="url(#featheringBlend)"
                />

                {/* Primary textured fold overlapping */}
                <path
                  d="M 0,-10 L 55,-10 C 85,25  30,75   60,130 C 85,175  40,195  50,210 L 0,210 Z"
                  fill="url(#sheerFold1)"
                  filter="url(#deepDropShadow)"
                />

                {/* Secondary highlight tracking the primary fold */}
                <path
                  d="M 0,-10 L 60,-10 C 88,28  33,78   63,133 C 88,178  43,198  53,210 L 0,210 Z"
                  fill="url(#sheerHighlight)"
                  opacity="0.6"
                />

                {/* Third cascading layer */}
                <path
                  d="M 0,-10 L 75,-10 C 110,60  45,115  85,165 C 110,195  60,205  70,210 L 0,210 Z"
                  fill="url(#sheerFold2)"
                  filter="url(#lightDropShadow)"
                />

                {/* Delicate outer edge sheer highlight */}
                <path
                  d="M 0,-10 L 80,-10 C 115,62  50,117  90,167 C 115,197  65,207  75,210 L 0,210 Z"
                  fill="url(#sheerHighlight)"
                  opacity="0.8"
                />
              </g>

              <g filter="url(#fabricNoise)" transform="scale(-1, 1)">
                {/* Mirrored fabric drape sweeping across (Left side) */}
                <path
                  d="M 0,-10 L 40,-10 C 70,50  10,90   50,140 C 80,180  25,195  35,210 L 0,210 Z"
                  fill="url(#solidToSheer)"
                  filter="url(#featheringBlend)"
                />

                {/* Deep background fold shadow */}
                <path
                  d="M 0,-10 L 50,-10 C 90,40  20,100  65,150 C 95,190  35,200  45,210 L 0,210 Z"
                  fill="url(#sheerShadow)"
                  filter="url(#featheringBlend)"
                />

                {/* Primary textured fold overlapping */}
                <path
                  d="M 0,-10 L 55,-10 C 85,25  30,75   60,130 C 85,175  40,195  50,210 L 0,210 Z"
                  fill="url(#sheerFold1)"
                  filter="url(#deepDropShadow)"
                />

                {/* Secondary highlight tracking the primary fold */}
                <path
                  d="M 0,-10 L 60,-10 C 88,28  33,78   63,133 C 88,178  43,198  53,210 L 0,210 Z"
                  fill="url(#sheerHighlight)"
                  opacity="0.6"
                />

                {/* Third cascading layer */}
                <path
                  d="M 0,-10 L 75,-10 C 110,60  45,115  85,165 C 110,195  60,205  70,210 L 0,210 Z"
                  fill="url(#sheerFold2)"
                  filter="url(#lightDropShadow)"
                />

                {/* Delicate outer edge sheer highlight */}
                <path
                  d="M 0,-10 L 80,-10 C 115,62  50,117  90,167 C 115,197  65,207  75,210 L 0,210 Z"
                  fill="url(#sheerHighlight)"
                  opacity="0.8"
                />
              </g>
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
