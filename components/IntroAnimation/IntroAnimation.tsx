'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowAnimation(true);
      // It takes about 3 seconds total
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasSeenIntro', 'true');
        setShowAnimation(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className={styles.container}>
            <motion.div
              className={styles.letterK}
              initial={{ x: '-50vw', y: '-50vh', opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              K
            </motion.div>
            
            <motion.div
              className={styles.letterJ}
              initial={{ x: '50vw', y: '50vh', opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              J
            </motion.div>

            <motion.div
              className={styles.fullName}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
            >
              KIRA JIA EVENTS
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
