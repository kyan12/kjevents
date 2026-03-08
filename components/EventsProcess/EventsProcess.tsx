"use client";

import { motion, Variants } from 'framer-motion';
import styles from './EventsProcess.module.css';

const steps = [
  { n: '01', title: 'DISCOVER', desc: 'Brief intake & alignment' },
  { n: '02', title: 'STRATEGY', desc: 'Venue & budget planning' },
  { n: '03', title: 'DESIGN', desc: 'Creative concept & theme' },
  { n: '04', title: 'PRODUCTION', desc: 'Vendor & logistics mgmt' },
  { n: '05', title: 'EXECUTION', desc: 'On-site command & control' },
  { n: '06', title: 'DEBRIEF', desc: 'Post-event reporting' },
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
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          HOW WE WORK
        </motion.p>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {steps.map((s, i) => (
            <motion.div key={i} className={styles.step} custom={i + 1} variants={fadeInUp}>
              <div className={styles.dot} />
              <p className={styles.stepTitle}>{s.title}</p>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
