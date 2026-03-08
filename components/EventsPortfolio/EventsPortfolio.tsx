"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import styles from './EventsPortfolio.module.css';

const projects = [
  {
    image: '/images/other_hero_1.png',
    title: 'A:Round Events Series',
    city: 'New York City',
    stats: '300+ Guests · Multi-Night Series',
    quote: '\u201CThe most electrifying recurring event series in the city. Every edition raises the bar.\u201D',
    attr: '\u2014 Series Producer',
  },
  {
    image: '/images/other_hero_2.png',
    title: 'Dream Asia Festival',
    city: 'New York City',
    stats: 'Multi-Day · Large-Scale Outdoor',
    quote: '\u201CA celebration of culture, food, and art — produced at a scale that honored every detail.\u201D',
    attr: '\u2014 Festival Director',
  },
  {
    image: '/images/other_hero_1.png',
    title: 'Rico Rico Fiesta',
    city: 'New York City',
    stats: 'Full Sensory Production',
    quote: '\u201CVibrant, bold, unforgettable. The energy was unlike anything we\u2019ve experienced.\u201D',
    attr: '\u2014 Event Host',
  },
  {
    image: '/images/other_hero_2.png',
    title: "Bella\u2019s Wild One",
    city: 'New York City',
    stats: 'Milestone Celebration',
    quote: '\u201CIntimate yet grand. Every detail was designed with whimsy and elegance.\u201D',
    attr: '\u2014 Client Family',
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
        <div className={styles.headerRow}>
          <div>
            <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
              OUR WORK
            </motion.p>
            <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
              SELECTED PROJECTS
            </motion.h2>
          </div>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => {
            const isLarge = i % 3 === 0;
            const gc = isLarge ? 'span 7' : 'span 5';
            const hr = isLarge ? '750px' : '550px';
            const mt = (i % 2 !== 0 && !isLarge) ? '80px' : '0px';

            return (
              <motion.div
                key={i}
                className={styles.projectWrapper}
                custom={i}
                variants={fadeInUp}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{ gridColumn: gc, height: hr, marginTop: mt }}
              >
                <img
                  src={p.image}
                  alt=""
                  className={cn(styles.projectImage, hov === i && styles.projectImageHover)}
                />

                <div className={cn(styles.glassPanel, hov === i ? styles.glassPanelActive : '')}>
                  <p className={styles.panelTitle}>{p.title}</p>
                  <p className={styles.panelCity}>{p.city}</p>
                  <div className={styles.panelDiv} />
                  <p className={styles.panelStats}>{p.stats}</p>
                  <p className={styles.panelQuote}>{p.quote}</p>
                  <p className={styles.panelAttr}>{p.attr}</p>
                </div>

                <div className={cn(styles.anchorLabel, hov === i ? styles.anchorLabelHidden : '')}>
                  <p className={styles.anchorText}>{p.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
