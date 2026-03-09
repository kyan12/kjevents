"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './EventsProcess.module.css';

const steps = [
  {
    n: '01', title: 'DISCOVER', phase: 'INITIATION',
    desc: 'Your vision, goals, and constraints, distilled into a strategic foundation.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeLinecap="round" />
        <path d="M12 12l4-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '02', title: 'STRATEGY', phase: 'PLANNING',
    desc: 'Venue shortlists, budget architecture, and timeline mapping.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '03', title: 'DESIGN', phase: 'CREATIVE',
    desc: 'Theme development, spatial design, and sensory experience planning.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M12 3l-1 9 5-2-4 11 1-9-5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '04', title: 'PRODUCTION', phase: 'PRE-EVENT',
    desc: 'Vendor coordination, contracts, technical production, and rehearsals.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" strokeLinecap="round" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '05', title: 'EXECUTION', phase: 'EVENT DAY',
    desc: 'Full team deployment. Every detail managed in real time.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M13 2L4 14h7l-1 8 9-12h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '06', title: 'DEBRIEF', phase: 'POST-EVENT',
    desc: 'Performance analysis, media recap, and lessons for next time.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M4 20h16" strokeLinecap="round" />
        <path d="M4 20v-6h3v6M10 20v-10h3v10M16 20v-14h3v14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.075 },
  }),
};

export default function EventsProcess() {
  const [hovered, setHovered] = useState(-1);

  return (
    <section id="events-process" className={styles.section}>
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.headerArea}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            HOW WE WORK
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            THE NARRATIVE
          </motion.h2>
        </motion.div>

        <div className={styles.trackViewport}>
          <div className={styles.horizontalTrack}>
            {steps.map((step, i) => (
              <div
                key={i}
                className={styles.stepColumn}
                style={{ '--progress': `${((i + 1) / 6) * 100}%` } as React.CSSProperties}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
              >
                <div className={styles.topHeader}>
                  <p className={cn(styles.cardNumber, hovered === i && styles.cardNumberActive)}>{step.n}</p>
                  <div className={cn(styles.iconWrapper, hovered === i && styles.iconActive)}>
                    {step.icon}
                  </div>
                </div>
                <div className={cn(styles.goldLine, hovered === i && styles.goldLineActive)} />
                <p className={styles.phaseLabel}>{step.phase}</p>
                <p className={styles.cardTitle}>{step.title}</p>
                <p className={styles.cardDesc}>{step.desc}</p>
                <div className={styles.ghostWatermark}>
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
