"use client";

import { useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import styles from './EventsStats.module.css';

const stats = [
  { value: 200, suffix: '+', label: 'Events Produced' },
  { value: 10, prefix: '$', suffix: 'M+', label: 'Production Value' },
  { value: 8, suffix: '+', label: 'Cities' },
  { value: 96, suffix: '%', label: 'Client Return Rate' },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  if (inView) {
    animate(mv, value, { duration: 1.8, ease: 'easeOut' });
  }

  return (
    <span ref={ref} className={styles.number}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function EventsStats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
