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
          <div ref={ribbonRef} className={styles.silkRibbon}>
            <svg
              viewBox="0 0 48 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ribbon-satin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(196,184,172,0)" />
                  <stop offset="15%" stopColor="rgba(196,184,172,0.12)" />
                  <stop offset="35%" stopColor="rgba(232,224,212,0.22)" />
                  <stop offset="50%" stopColor="rgba(196,184,172,0.10)" />
                  <stop offset="65%" stopColor="rgba(232,224,212,0.18)" />
                  <stop offset="85%" stopColor="rgba(196,184,172,0.12)" />
                  <stop offset="100%" stopColor="rgba(196,184,172,0)" />
                </linearGradient>
                <linearGradient id="ribbon-shimmer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <clipPath id="ribbon-clip">
                  <path d="M 10,0 C 0,60 38,120 18,180 C -2,240 38,300 18,360 C -2,420 38,480 18,540 C -2,600 38,660 18,720 C -2,780 18,800 18,800 L 30,800 C 30,800 40,780 30,720 C 48,660 10,600 30,540 C 48,480 10,420 30,360 C 48,300 10,240 30,180 C 48,120 10,60 30,0 Z" />
                </clipPath>
              </defs>
              {/* Satin base fill */}
              <path
                d="M 10,0 C 0,60 38,120 18,180 C -2,240 38,300 18,360 C -2,420 38,480 18,540 C -2,600 38,660 18,720 C -2,780 18,800 18,800 L 30,800 C 30,800 40,780 30,720 C 48,660 10,600 30,540 C 48,480 10,420 30,360 C 48,300 10,240 30,180 C 48,120 10,60 30,0 Z"
                fill="url(#ribbon-satin)"
              />
              {/* Shimmer sweep — translated by CSS --shimmer-progress */}
              <g clipPath="url(#ribbon-clip)">
                <rect
                  className={styles.shimmerRect}
                  x="0"
                  y="0"
                  width="48"
                  height="800"
                  fill="url(#ribbon-shimmer)"
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
