"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './EventsCapabilities.module.css';

const caps = [
  {
    n: '01', title: 'Special & Private Events',
    desc: 'Refined gatherings produced with careful attention to atmosphere, entertainment, and guest experience.',
    items: ['Birthday celebrations', 'Corporate celebrations', 'Private receptions & milestone events', 'Curated entertainment programming'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M7 5h10M8 5c0 6 4 8 4 11M16 5c0 6-4 8-4 11M12 16v5M9 21h6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    n: '02', title: 'Cultural, Music Festival & Stage Productions',
    desc: 'Live performance production and cultural programming developed in collaboration with artists, agents, and production teams.',
    items: ['Festival production planning & curation', 'Stage management & coordination', 'Artist booking and talent relations', 'Live performance scheduling'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M6 16v-8 M12 20v-16 M18 14v-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '03', title: 'Corporate Conferences',
    desc: 'Multi-day strategic events from 50 to 5,000 attendees. AV, logistics, speaker management.',
    items: ['Full AV production management', 'Speaker & agenda coordination', 'Multi-day logistics planning', 'Breakout & session management'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M4 18h16 M8 14h8 M12 10v4 M12 4v2 M9 4h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '04', title: 'Product Launches',
    desc: 'The moment your brand makes its next statement. Experiential activations that are unforgettable.',
    items: ['Brand activation strategy', 'Experiential venue design', 'Press & media coordination', 'Launch moment production'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M12 3L15 9L21 12L15 15L12 21L9 15L3 12L9 9Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '05', title: 'Annual Galas & Fundraisers',
    desc: 'Black-tie excellence. Table design to paddle raise, managed with precision and care.',
    items: ['Gala design & full theming', 'Auction & fundraiser management', 'Table curation & seating', 'Entertainment & flow management'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M12 3v18 M7 14c0-4 5-5 5-5 M17 14c0-4-5-5-5-5 M9 18c0-3 3-4 3-4 M15 18c0-3-3-4-3-4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    n: '06', title: 'Executive Retreats',
    desc: 'Intimate, high-stakes off-site gatherings that sharpen teams and honor relationships.',
    items: ['Venue sourcing & negotiation', 'Program & agenda design', 'Travel & accommodation logistics', 'Facilitation support'],
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M4 18L10 8L14 14L20 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.09 },
  }),
};

export default function EventsCapabilities() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, index: -1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, index });
  };

  return (
    <section id="events-capabilities" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className={styles.headerRow}>
          <div>
            <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
              WHAT WE DO
            </motion.p>
            <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
              CAPABILITIES
            </motion.h2>
          </div>
          <motion.p className={styles.headerDesc} custom={2} variants={fadeInUp}>
            We engineer environments. From private enclaves to large-scale productions, our methodology ensures flawless execution and striking aesthetics.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {caps.map((c, i) => (
            <motion.div
              key={i}
              className={styles.tileWrapper}
              custom={i}
              variants={fadeInUp}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setMousePos((prev) => ({ ...prev, index: -1 }))}
            >
              <div
                className={styles.spotlight}
                style={{
                  background: `radial-gradient(circle 350px at ${mousePos.index === i ? mousePos.x : -500}px ${mousePos.index === i ? mousePos.y : -500}px, rgba(205,168,76,0.04), transparent 80%)`,
                  transition: mousePos.index === i ? 'none' : 'background 0.3s ease',
                }}
              />
              <div className={styles.tileContent}>
                <div className={styles.topHeader}>
                  <span className={cn(styles.ghostNum, mousePos.index === i ? styles.ghostNumActive : '')}>
                    {c.n}
                  </span>
                  <div className={cn(styles.iconWrapper, mousePos.index === i ? styles.iconActive : '')}>
                    {c.icon}
                  </div>
                </div>
                <div className={cn(styles.goldLine, mousePos.index === i ? styles.goldLineActive : '')} />
                <p className={styles.cardTitle}>{c.title}</p>
                <p className={styles.cardDesc}>{c.desc}</p>
                <div className={cn(styles.itemsContainer, mousePos.index === i ? styles.itemsContainerActive : '')}>
                  {c.items.map((item, j) => (
                    <div key={j} className={styles.item}>
                      <span className={styles.itemDash}>&mdash;</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
