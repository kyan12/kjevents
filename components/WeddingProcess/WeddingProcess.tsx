"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { activeStep, progressRef, start, jumpTo } = useStepProgress(steps.length);

  // Start the timer when section enters viewport
  useEffect(() => {
    if (isInView && !isMobile) {
      start();
    }
  }, [isInView, isMobile, start]);

  // RAF loop for timeline fill + bouquet throw (reads progressRef)
  useEffect(() => {
    if (isMobile) return;
    let raf: number;
    const tick = () => {
      const p = progressRef.current;
      if (timelineFillRef.current) {
        timelineFillRef.current.style.transform = `scaleY(${p.total})`;
      }
      // Note: bouquetWrapperRef dynamic scale/throw transform removed.
      // Dynamic vertical alignment is now handled declaratively on the container.
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, progressRef]);

  // Mobile: static layout
  if (isMobile) {
    return (
      <section id="wedding-process" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.preLabel}>HOW WE WORK</p>
            <h2 className={styles.heading}>The Process</h2>
          </div>

          <div className={styles.mobileBouquet}>
            <BouquetSVG activeStep={activeStep} progressRef={progressRef} static />
          </div>

          <div className={styles.mobileTimeline}>
            <motion.div
              key={`m-step-${activeStep}`}
              className={styles.mobileStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.stepHeader}>
                <p className={styles.stepNum}>{steps[activeStep].n}</p>
                <p className={styles.stepTitle}>{steps[activeStep].title}</p>
              </div>
              <p className={styles.stepDesc}>{steps[activeStep].desc}</p>
            </motion.div>

            <div className={styles.mobileControls}>
              <button
                className={styles.controlBtn}
                onClick={() => jumpTo(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                <ChevronLeft size={20} strokeWidth={1} />
              </button>
              <div className={styles.mobileDots}>
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={i === activeStep ? styles.activeDot : styles.dotIndicator}
                    onClick={() => jumpTo(i)}
                  />
                ))}
              </div>
              <button
                className={styles.controlBtn}
                onClick={() => jumpTo(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
              >
                <ChevronRight size={20} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: timer-driven layout (no scroll pinning)
  return (
    <section
      id="wedding-process"
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.container}>
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
                  <div key={i} className={styles.step} data-state={state} onClick={() => jumpTo(i)}>
                    <div className={styles.dot}>
                      <div className={styles.dotInner} />
                    </div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepHeader}>
                        <p className={styles.stepNum}>{step.n}</p>
                        <p className={styles.stepTitle}>{step.title}</p>
                      </div>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bouquet column (SVG illustration) */}
          <div className={styles.bouquetCol}>
            <div ref={bouquetWrapperRef} className={styles.bouquetWrapper}>
              <BouquetSVG activeStep={activeStep} progressRef={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
