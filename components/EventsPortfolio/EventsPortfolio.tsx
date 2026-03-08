"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from './EventsPortfolio.module.css';

const projects = [
  {
    image: '/images/other_hero_1.png',
    title: 'Featured Corporate Summit',
    city: 'New York City',
    stats: '500 Attendees \u00B7 3-Day Event',
    quote: '\u201CThe most organized event we have ever hosted.\u201D',
    attr: '\u2014 Event Chair',
    comingSoon: false,
  },
  {
    image: '/images/other_hero_2.png',
    title: 'Annual Gala Production',
    city: 'New York City',
    stats: '800 Guests \u00B7 Black-Tie',
    quote: '\u201CFlawless from first course to final bow.\u201D',
    attr: '\u2014 Executive Director',
    comingSoon: false,
  },
  {
    image: null,
    title: 'Coming Soon',
    city: '',
    stats: '',
    quote: '',
    attr: '',
    comingSoon: true,
  },
  {
    image: null,
    title: 'Coming Soon',
    city: '',
    stats: '',
    quote: '',
    attr: '',
    comingSoon: true,
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.12 },
  }),
};

export default function EventsPortfolio() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="events-portfolio" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          OUR WORK
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          SELECTED PROJECTS
        </motion.h2>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${p.comingSoon ? styles.cardMuted : ''} ${hov === i ? styles.cardHover : ''}`}
              custom={i}
              variants={fadeInUp}
              onMouseEnter={() => !p.comingSoon && setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              {p.image ? (
                <div className={styles.imageWrap}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'cover',
                      transform: hov === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.7s ease',
                    }}
                  />
                </div>
              ) : (
                <div className={styles.placeholderImage}>
                  <p className={styles.placeholderText}>Portfolio</p>
                </div>
              )}
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{p.title}</p>
                {p.city && (
                  <p className={styles.cardCity}>{p.city}</p>
                )}
                {p.stats && (
                  <p className={styles.cardStats}>{p.stats}</p>
                )}
                {p.quote && (
                  <p className={styles.cardQuote}>{p.quote}</p>
                )}
                {p.attr && (
                  <p className={styles.cardAttr}>{p.attr}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
