"use client";

import { motion, Variants } from 'framer-motion';
import styles from './EventsTestimonials.module.css';

const testimonials = [
  {
    quote:
      'Kira Jia is one of the most professional and dependable event professionals I’ve worked with in the live events industry. As an event planner, talent curator, and stage manager, she brings exceptional organization, attention to detail, and leadership that helps ensure every event runs seamlessly. She also brings a rare combination of creative vision and operational discipline. I would confidently recommend her to any organization looking for a highly capable professional who can help produce a polished, well-executed, and truly memorable event.',
    name: 'Jason Rittenberry',
    title: 'Founder & CEO, Tristar Production Group',
  },
  {
    quote:
      'Kira was a huge asset to our team at A Round Entertainment. She’s proactive, organized, and very good at keeping things moving under pressure. What stood out most to me was her ability to manage details without losing sight of the overall client experience. She’s dependable, easy to work with, and brings a level of care and professionalism that’s hard to find.',
    name: 'Eric Jeong',
    title: 'COO & Co-Founder, A Round Entertainment Group',
  },
  {
    quote:
      'Planning our daughter Bella’s first birthday was incredibly special to us, and Kira made the entire experience feel easy and joyful even though we hired her very last minute. From helping us find the right vendors to making sure every detail came together beautifully, she handled everything with such care and professionalism. Even when we had a few last-minute requests, Kira pulled through and made everything run smoothly so we could simply enjoy the celebration with our family and friends.',
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
