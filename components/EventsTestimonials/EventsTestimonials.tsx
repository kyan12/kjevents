"use client";

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './EventsTestimonials.module.css';

const testimonials = [
  {
    quote: 'Kira turned our vision into something beyond what we imagined. Every detail was flawless, every moment intentional.',
    name: 'Michelle T.',
    title: 'Founder, A:Round Events',
  },
  {
    quote: 'From concept to execution, the level of professionalism and creativity was unmatched. Our guests are still talking about it.',
    name: 'David L.',
    title: 'Director, Dream Asia Festival',
  },
  {
    quote: 'Working with KJ Events felt effortless. They handled the complexity so we could enjoy the celebration.',
    name: 'Andrea R.',
    title: 'Event Chair, Annual Gala',
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.12 },
  }),
};

export default function EventsTestimonials() {
  return (
    <section id="events-testimonials" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          CLIENT VOICES
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          WHAT THEY SAY
        </motion.h2>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div key={i} className={styles.testimonialCard} custom={i + 2} variants={fadeInUp}>
              <div className={styles.cardContent}>
                <span className={styles.quoteMark}>&ldquo;</span>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.attribution}>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.title}>{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
