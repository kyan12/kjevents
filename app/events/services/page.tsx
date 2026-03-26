"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import Nav from '@/components/Nav/Nav';
import { ScrollEffectsProvider } from '@/components/ScrollEffects/ScrollEffectsProvider';
import { caps } from '@/components/EventsCapabilities/capsData';
import styles from './page.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.09 },
  }),
};

export default function ServicesPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, index: -1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top, index });
  };

  return (
    <ScrollEffectsProvider theme="events">
      <Nav mode="events" />
      <main className={styles.main}>
        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <div>
                <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
                  WHAT WE DO
                </motion.p>
                <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
                  ALL SERVICES
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
                  className={cn(styles.tileWrapper, mousePos.index === i ? styles.tileWrapperActive : '')}
                  custom={i}
                  variants={fadeInUp}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => setMousePos((prev) => ({ ...prev, index: -1 }))}
                >
                  <div
                    className={styles.spotlight}
                    style={{
                      background: `radial-gradient(circle 350px at ${mousePos.index === i ? mousePos.x : -500}px ${mousePos.index === i ? mousePos.y : -500}px, rgba(205,168,76,0.06), transparent 80%)`,
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
          </div>
        </motion.section>
      </main>
    </ScrollEffectsProvider>
  );
}
