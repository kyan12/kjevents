"use client";

import { useState, useEffect } from 'react';
import styles from './WeddingHero.module.css';

export default function WeddingHero() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`${styles.content} ${on ? styles.visible : ''}`}>
        <p className={styles.brandLabel}>KIRA JIA EVENTS &middot; WEDDING PLANNING</p>
        <blockquote className={styles.quote}>
          &ldquo;The most beautiful celebrations begin with the quietest planning.&rdquo;
        </blockquote>
        <p className={styles.attribution}>&mdash; Kira Jia</p>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
