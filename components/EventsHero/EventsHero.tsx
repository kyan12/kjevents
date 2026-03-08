"use client";

import { useState, useEffect } from 'react';
import styles from './EventsHero.module.css';

const words = ['WE', 'PRODUCE', 'EVENTS THAT', 'PEOPLE', 'TALK ABOUT.'];

export default function EventsHero() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgTexture} />
      <div className={styles.content}>
        <div className={`${styles.categoryBar} ${on ? styles.visible : ''}`}>
          <div className={styles.goldLine} />
          <p className={styles.categoryText}>
            CORPORATE &middot; GALAS &middot; LAUNCHES &middot; SUMMITS
          </p>
          <div className={styles.goldLineFade} />
        </div>

        <h1 className={styles.heading}>
          {words.map((w, i) => (
            <span
              key={i}
              className={styles.word}
              style={{
                transitionDelay: `${0.5 + i * 0.09}s`,
                opacity: on ? 1 : 0,
                transform: on ? 'none' : 'translateY(64px)',
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        <div className={`${styles.scrollIndicator} ${on ? styles.visible : ''}`}>
          <div className={styles.scrollLine} />
          <p className={styles.scrollText}>OUR WORK &darr;</p>
        </div>
      </div>
    </section>
  );
}
