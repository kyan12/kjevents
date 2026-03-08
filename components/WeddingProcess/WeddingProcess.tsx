"use client";

import { useRef, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useIsMobile } from '../ScrollEffects/useIsMobile';
import { useStepProgress } from './useStepProgress';
import BouquetSVG from './BouquetSVG';
import styles from './WeddingProcess.module.css';

const steps = [
  { n: '01', title: 'Consultation', desc: 'Two hours. Just conversation. We learn how you love \u2014 and what your day should feel like.' },
  { n: '02', title: 'Vision & Design', desc: 'Mood boards, palette, venue shortlist. Everything aligned to your story, your people, your style.' },
  { n: '03', title: 'Vendor Curation', desc: 'We only recommend vendors we trust absolutely. Every photographer, florist, and caterer is vetted.' },
  { n: '04', title: 'Planning & Logistics', desc: 'Every timeline, contract, and contingency \u2014 organized, confirmed, and communicated.' },
  { n: '05', title: 'Your Wedding Day', desc: 'Our team is everywhere. You are present only for the joy.' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.11 },
  }),
};

export default function WeddingProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineFillRef = useRef<HTMLDivElement>(null);
  const bouquetWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { activeStep, progressRef } = useStepProgress(sectionRef, steps.length, !isMobile);

  // Direct DOM updates for timeline fill and bouquet throw
  useLenis(useCallback(() => {
    if (isMobile) return;
    const p = progressRef.current;
    if (timelineFillRef.current) {
      timelineFillRef.current.style.transform = `scaleY(${p.total})`;
    }
    if (bouquetWrapperRef.current) {
      if (p.throw > 0) {
        if (p.throw < 0.6) {
          const t = p.throw / 0.6;
          bouquetWrapperRef.current.style.transform =
            `translateY(${-120 * t}px) rotate(${-15 * t}deg) scale(${1 + 0.1 * t})`;
          bouquetWrapperRef.current.style.opacity = '';
        } else {
          const t = (p.throw - 0.6) / 0.4;
          bouquetWrapperRef.current.style.transform =
            `translateY(-120px) rotate(-15deg) scale(${1.1 - 0.5 * t})`;
          bouquetWrapperRef.current.style.opacity = `${1 - t}`;
        }
      } else {
        bouquetWrapperRef.current.style.transform = '';
        bouquetWrapperRef.current.style.opacity = '';
      }
    }
  }, [isMobile, progressRef]));

  // Mobile: static layout
  if (isMobile) {
    return (
      <section id="wedding-process" className={styles.section}>
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            HOW WE WORK
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            The Process
          </motion.h2>

          <div className={styles.mobileBouquet}>
            <BouquetSVG activeStep={4} progressRef={progressRef} static />
          </div>

          <div className={styles.mobileTimeline}>
            {steps.map((step, i) => (
              <motion.div key={i} className={styles.mobileStep} custom={i + 2} variants={fadeInUp}>
                <div className={styles.dot}><div className={styles.dotInner} /></div>
                <p className={styles.stepNum}>{step.n}</p>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  // Desktop: scroll-linked layout
  return (
    <section
      id="wedding-process"
      ref={sectionRef}
      className={styles.scrollSection}
    >
      <div className={styles.sticky}>
        <div className={styles.header}>
          <p className={styles.preLabel}>HOW WE WORK</p>
          <h2 className={styles.heading}>The Process</h2>
        </div>

        <div className={styles.splitLayout}>
          {/* Timeline column */}
          <div className={styles.timelineCol}>
            <div className={styles.timelineTrack}>
              <div ref={timelineFillRef} className={styles.timelineFill} />
              {steps.map((step, i) => {
                const state = i < activeStep ? 'completed' : i === activeStep ? 'active' : 'upcoming';
                return (
                  <div key={i} className={styles.step} data-state={state}>
                    <div className={styles.dot}>
                      <div className={styles.dotInner} />
                    </div>
                    <div className={styles.stepContent}>
                      <p className={styles.stepNum}>{step.n}</p>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bouquet column */}
          <div className={styles.bouquetCol}>
            <div ref={bouquetWrapperRef}>
              <BouquetSVG activeStep={activeStep} progressRef={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
