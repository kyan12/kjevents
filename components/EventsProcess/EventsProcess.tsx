"use client";

import { motion, Variants } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import styles from './EventsProcess.module.css';

const steps = [
  { n: '01', title: 'DISCOVER', desc: 'Your vision, goals, and constraints \u2014 distilled into a strategic foundation.' },
  { n: '02', title: 'STRATEGY', desc: 'Venue shortlists, budget architecture, and timeline mapping.' },
  { n: '03', title: 'DESIGN', desc: 'Theme development, spatial design, and sensory experience planning.' },
  { n: '04', title: 'PRODUCTION', desc: 'Vendor coordination, contracts, technical production, and rehearsals.' },
  { n: '05', title: 'EXECUTION', desc: 'Full team deployment. Every detail managed in real time.' },
  { n: '06', title: 'DEBRIEF', desc: 'Performance analysis, media recap, and lessons for next time.' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.075 },
  }),
};

export default function EventsProcess() {
  return (
    <section id="events-process" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className={styles.headerArea}>
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            HOW WE WORK
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            THE NARRATIVE
          </motion.h2>
        </div>

        <div className={styles.stickyContainer}>
          {steps.map((step, i) => {
            const topOffset = 180 + (i * 40);
            return (
              <motion.div
                key={i}
                className={styles.card}
                custom={i + 1}
                variants={fadeInUp}
                style={{
                  top: `${topOffset}px`,
                  transform: `scale(${1 - (steps.length - 1 - i) * 0.02})`,
                  zIndex: i,
                }}
              >
                <div className={styles.cardNumberWrapper}>
                  <p className={styles.cardNumber}>{step.n}</p>
                </div>
                <div className={styles.cardDivider} />
                <div>
                  <p className={styles.cardTitle}>{step.title}</p>
                  <p className={styles.cardDesc}>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
