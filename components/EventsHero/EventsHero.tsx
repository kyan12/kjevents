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
        </div>

        <h1 className={styles.heading}>
          <div className={styles.wordWrapper}>
            <LetterReveal text="WE PRODUCE" delayOffset={0.4} on={on} />
          </div>
          <div className={styles.wordWrapper}>
            <LetterReveal text="EVENTS THAT" delayOffset={0.7} on={on} />
          </div>
          <div className={`${styles.wordWrapper} ${styles.goldHighlight}`}>
            <LetterReveal text="PEOPLE TALK" delayOffset={1.0} on={on} />
          </div>
          <div className={`${styles.wordWrapper} ${styles.goldHighlight}`}>
            <LetterReveal text="ABOUT." delayOffset={1.3} on={on} />
          </div>
        </h1>


      </div>
    </section>
  );
}

const LetterReveal = ({ text, delayOffset, on }: { text: string, delayOffset: number, on: boolean }) => (
  <span className={styles.letterRevealBase}>
    {text.split('').map((char, i) => (
      <span key={i} className={styles.letter} style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + (i * 0.03)}s, opacity 0.8s ease ${delayOffset + (i * 0.03)}s`,
        whiteSpace: char === ' ' ? 'pre' : 'normal'
      }}>
        {char}
      </span>
    ))}
  </span>
);
