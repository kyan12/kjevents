"use client";

import { useTransition } from './TransitionContext';
import styles from './TransitionOverlay.module.css';

export default function TransitionOverlay() {
  const { isTransitioning, transitionColor } = useTransition();

  return (
    <div
      className={`${styles.overlay} ${isTransitioning ? styles.active : ''}`}
      style={{ backgroundColor: transitionColor }}
    />
  );
}
