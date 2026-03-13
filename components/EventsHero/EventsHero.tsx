"use client";

import { useState, useEffect } from 'react';
import styles from './EventsHero.module.css';

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
            PRIVATE EVENTS &middot; CELEBRATIONS &middot; STAGE MANAGEMENT &middot; CULTURAL PRODUCTIONS
          </p>
        </div>

        <h1 className={styles.heading}>
          <div className={styles.wordWrapper}>
            <LetterReveal text="WE PRODUCE EVENTS" delayOffset={0.4} on={on} />
          </div>
          <div className={styles.wordWrapper}>
            <LetterReveal text="THAT PEOPLE" delayOffset={0.75} on={on} />
          </div>
          <div className={`${styles.wordWrapper} ${styles.goldHighlight}`}>
            <LetterReveal text="TALK ABOUT." delayOffset={1.1} on={on} />
          </div>
        </h1>

        <p className={`${styles.subhead} ${on ? styles.visible : ''}`}>
          From private milestone celebrations to large-scale cultural productions, every detail is shaped so the experience feels seamless, elevated, and unforgettable.
        </p>
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
