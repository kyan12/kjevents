"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import TransitionLink from '@/components/PageTransition/TransitionLink';
import { caps } from './capsData';
import styles from './EventsCapabilities.module.css';

const highlighted = caps.slice(0, 2);

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

        <div className={styles.showcaseGrid}>
          {highlighted.map((c, i) => (
            <motion.div
              key={i}
              className={cn(styles.showcaseTile, mousePos.index === i ? styles.showcaseTileActive : '')}
              custom={i + 1}
              variants={fadeInUp}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setMousePos((prev) => ({ ...prev, index: -1 }))}
            >
              <div
                className={styles.spotlight}
                style={{
                  background: `radial-gradient(circle 500px at ${mousePos.index === i ? mousePos.x : -500}px ${mousePos.index === i ? mousePos.y : -500}px, rgba(205,168,76,0.08), transparent 70%)`,
                  transition: mousePos.index === i ? 'none' : 'background 0.3s ease',
                }}
              />
              <div className={styles.shimmerBorder} />
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

        <motion.div className={styles.viewAllRow} custom={4} variants={fadeInUp}>
          <TransitionLink
            href="/events/services"
            color="var(--e-bg)"
            className={styles.viewAllLink}
          >
            VIEW ALL SERVICES &rarr;
          </TransitionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
