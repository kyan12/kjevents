'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../ScrollEffects/useIsMobile';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [fontReady, setFontReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.fonts.ready.then(() => setFontReady(true));
  }, []);

  useEffect(() => {
    if (!fontReady) return;
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [fontReady]);

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
              initial={{ y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={fontReady ? { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              K
            </motion.div>

            <motion.div
              className={styles.letterJ}
              initial={{ y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={fontReady ? { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 } : undefined}
              transition={{ delay: 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              J
            </motion.div>

            <motion.div
              className={styles.fullName}
              initial={{ opacity: 0, y: isMobile ? -10 : -20, scale: 0.95, filter: 'blur(4px)' }}
              animate={fontReady ? { opacity: 1, y: isMobile ? -20 : -36, scale: 1, filter: 'blur(0px)' } : undefined}
              transition={{ delay: 1.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Kira Jia Events
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
