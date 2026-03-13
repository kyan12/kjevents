"use client";

import { motion, Variants } from 'framer-motion';
import styles from './EventsTestimonials.module.css';

const testimonials = [
  {
    quote:
      'Kira is one of the most dependable event professionals I’ve worked with. She brings exceptional organization, attention to detail, and leadership that helps every event run seamlessly. What sets her apart is the combination of creative vision and operational discipline — the kind that leads to a polished, memorable event.',
    name: 'Jason Rittenberry',
    title: 'Founder & CEO, Tristar Production Group',
  },
  {
    quote:
      'Kira was a huge asset to our team at A Round Entertainment. She’s proactive, organized, and very good at keeping things moving under pressure. She manages the details without losing sight of the overall guest experience, and brings a level of care and professionalism that’s hard to find.',
    name: 'Eric Jeong',
    title: 'COO & Co-Founder, A Round Entertainment Group',
  },
  {
    quote:
      'Planning our daughter Bella’s first birthday was incredibly special to us, and Kira made the entire experience feel easy and joyful — even though we hired her very last minute. She handled every detail with care, and made everything run smoothly so we could simply enjoy the celebration with our family and friends.',
    name: 'Anny',
    title: 'Bella’s Mom',
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
          WHAT THEY SAY
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          CLIENT TESTIMONIALS
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
