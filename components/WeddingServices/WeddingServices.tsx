"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './WeddingServices.module.css';

const services = [
  {
    en: 'Wedding Day\nManagement',
    zh: '婚礼当日协调',
    price: 'From $800',
    desc: 'Designed for couples who have completed their planning and seek professional coordination to ensure the wedding day unfolds seamlessly.',
    items: [
      'Venue walkthrough & layout confirmation',
      'Vendor coordination & timeline creation',
      'Ceremony & reception management',
      'Bilingual vendor & guest communication',
      'Full-day coordination coverage',
    ],
  },
  {
    en: 'Partial\nPlanning',
    zh: '部分策划服务',
    price: 'By Inquiry',
    desc: 'Ideal for couples who have begun planning and seek professional guidance to refine logistics, coordinate vendors, and ensure a cohesive celebration.',
    items: [
      'Vendor recommendations and booking',
      'Design & styling consultation',
      'Budget management assistance',
      'Monthly planning sessions',
      'Wedding Day Management included',
    ],
  },
  {
    en: 'Full\nPlanning',
    zh: '全程婚礼策划',
    price: 'By Inquiry',
    desc: 'Designed for couples seeking a fully guided planning experience, from initial concept to the final moment of celebration.',
    items: [
      'Comprehensive planning, design & event production',
      'Curated vendor sourcing and booking',
      'Custom mood board creation',
      'Cultural elements integration',
      'Full-service coordination',
    ],
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.13 },
  }),
};

export default function WeddingServices() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="wedding-services" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          WHAT WE OFFER
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          SERVICES
        </motion.h2>
        <div className={styles.grid}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${hov === i ? styles.cardHover : ''}`}
              custom={i}
              variants={fadeInUp}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              <span className={styles.ghostNumber}>0{i + 1}</span>
              <div className={styles.cardBorder} />
              <p className={styles.cardTitle}>{s.en}</p>
              <p className={styles.chineseSubtext}>{s.zh}</p>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.itemList}>
                {s.items.map((item, j) => (
                  <div key={j} className={styles.item}>
                    <span className={styles.itemDash}>&mdash;</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <p className={`${styles.price} ${hov === i ? styles.priceVisible : ''}`}>
                  {s.price}
                </p>
                <button className={`${styles.ctaButton} ${hov === i ? styles.ctaButtonHover : ''}`}>
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
