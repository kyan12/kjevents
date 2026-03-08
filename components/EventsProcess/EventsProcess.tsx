"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
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

      {/* Container holding the horizontal scroll frame */}
      <div className={styles.contentContainer}>

        {/* Simple fade-in header, separate from the horizontal track */}
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

        {/* The horizontal track container with native scroll */}
        <div className={styles.trackViewport}>
          <div className={styles.horizontalTrack}>
            {/* Start spacer so the first item begins near the center/right */}
            <div className={styles.trackSpacer} />

            {steps.map((step, i) => (
              <div key={i} className={styles.stepColumn}>

                {/* Connection line dot / number anchor */}
                <div className={styles.nodeAnchor}>
                  <p className={styles.cardNumber}>{step.n}</p>
                </div>

                <div className={styles.cardContent}>
                  <p className={styles.cardTitle}>{step.title}</p>
                  <p className={styles.cardDesc}>{step.desc}</p>
                </div>
              </div>
            ))}

            {/* End spacer so the last item can leave exactly at the edge */}
            <div className={styles.trackSpacer} />
          </div>
        </div>

      </div>
    </section>
  );
}
