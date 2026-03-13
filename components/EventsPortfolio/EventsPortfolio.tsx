"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './EventsPortfolio.module.css';

const projects = [
  {
    image: '/images/events-replacements/a-round.jpg',
    title: 'A:Round Events Series',
    city: 'New York City',
    stats: '300+ Guests · 50+ Events',
    quote: '"High-energy nightlife and social events built around atmosphere, entertainment, and guest experience."',
    attr: '- Event planning, coordination, and on-site operations',
    photographer: 'Jason Moy',
  },
  {
    image: '/images/events-replacements/dream-asia.jpg',
    title: 'Dream Asia Festival',
    city: 'Large-Scale Cultural Festival',
    stats: '3-Day Festival',
    quote: '"Multi-day production shaped by stage coordination, cultural programming, and live-event logistics."',
    attr: '- Production / Stage Director',
    photographer: 'Jason Moy',
  },
  {
    image: '/images/events-replacements/rico.jpg',
    title: 'Rico Rico Fiesta',
    city: 'Cultural & Entertainment Event',
    stats: 'Live Production · Guest Experience',
    quote: '"A high-energy event designed around crowd experience, live entertainment, and seamless production flow."',
    attr: '- Production / Stage Coordination',
    photographer: 'Jason Moy',
  },
  {
    image: '/images/events-replacements/bella.jpg',
    title: 'Bella\u2019s Wild One',
    city: 'Private Milestone Celebration',
    stats: 'New York City',
    quote: '"A personalized celebration shaped by strong flow, thoughtful details, and a fun guest experience."',
    attr: '- Planning and on-site coordination',
    photographer: 'Jason Moy',
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
                  {p.photographer && (
                    <p className={styles.panelPhotographer}>Photo by {p.photographer}</p>
                  )}
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
