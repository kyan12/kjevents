'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../ScrollEffects/useIsMobile';
import styles from './IntroAnimation.module.css';

export default function KJhomealt() {
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

  const pathK = "M129.66 151.04L129.66 149.38Q125.31 150.78 120.77 151.49Q116.22 152.19 111.87 152.19L111.87 152.19Q100.86 152.19 92.67 147.26Q84.48 142.34 78.14 134.85Q71.81 127.36 66.88 118.46Q61.95 109.57 57.34 101.38Q52.74 93.18 47.94 86.85Q43.14 80.51 37.25 78.34L37.25 78.34Q36.61 78.08 36.67 77.50Q36.74 76.93 37.12 76.54L37.12 76.54L62.98 48.90Q64.26 47.49 65.98 45.89Q67.71 44.29 69.63 42.82Q71.55 41.34 73.47 40.13Q75.39 38.91 76.93 38.40L76.93 38.40L56.70 38.40Q58.11 38.91 59.39 40.06Q60.67 41.22 61.31 42.82Q61.95 44.42 61.76 46.21Q61.57 48 59.78 49.92L59.78 49.92L23.94 88.32L23.94 49.66Q23.94 46.98 24.38 45.12Q24.83 43.26 25.73 41.92Q26.62 40.58 27.78 39.74Q28.93 38.91 30.34 38.40L30.34 38.40L6.27 38.40Q7.68 38.78 8.90 39.68Q10.11 40.58 10.94 41.92Q11.78 43.26 12.29 45.12Q12.80 46.98 12.80 49.54L12.80 49.54L12.80 115.84Q12.80 118.27 12.42 120.26Q12.03 122.24 11.26 123.78Q10.50 125.31 9.28 126.40Q8.06 127.49 6.27 128L6.27 128L30.34 128Q28.93 127.49 27.71 126.53Q26.50 125.57 25.66 124.10Q24.83 122.62 24.38 120.64Q23.94 118.66 23.94 115.97L23.94 115.97L23.94 93.18Q23.94 90.88 24.38 90.24Q24.83 89.60 26.11 88.06L26.11 88.06Q27.90 86.02 29.76 84.10Q31.62 82.18 33.28 80.38L33.28 80.38Q34.43 79.36 35.52 79.30Q36.61 79.23 38.02 80.13L38.02 80.13Q44.03 83.33 47.62 90.18Q51.20 97.02 54.21 105.34Q57.22 113.66 60.54 122.43Q63.87 131.20 69.38 138.43Q74.88 145.66 83.39 150.40Q91.90 155.14 105.34 155.14L105.34 155.14Q111.10 155.14 117.18 154.18Q123.26 153.22 129.66 151.04L129.66 151.04Z";
  const pathJ = "M29.82 38.40L5.25 38.40Q7.30 39.04 8.58 40.26Q9.86 41.47 10.62 43.33Q11.39 45.18 11.71 47.55Q12.03 49.92 12.03 52.74L12.03 52.74L12.03 114.94Q12.03 129.41 9.60 138.30Q7.17 147.20 3.78 152.26Q0.38 157.31-3.33 159.42Q-7.04 161.54-9.73 162.30L-9.73 162.30L-9.73 163.20Q-7.68 162.82-4.42 161.41Q-1.15 160 2.56 157.50Q6.27 155.01 9.92 151.23Q13.57 147.46 16.51 142.21Q19.46 136.96 21.31 130.18Q23.17 123.39 23.17 114.94L23.17 114.94L23.17 52.74Q23.17 49.79 23.42 47.49Q23.68 45.18 24.38 43.39Q25.09 41.60 26.43 40.32Q27.78 39.04 29.82 38.40L29.82 38.40Z";

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
              initial={{ y: 10, opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={fontReady ? { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="0 30 135 130" style={{ height: '1em', overflow: 'visible' }}>
                <motion.path
                  d={pathK}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={fontReady ? { pathLength: 1, fillOpacity: 1 } : undefined}
                  transition={{
                    pathLength: { duration: 1.8, ease: "easeInOut" },
                    fillOpacity: { delay: 1.2, duration: 0.8, ease: "easeIn" }
                  }}
                />
              </svg>
            </motion.div>

            <motion.div
              className={styles.letterJ}
              initial={{ y: 10, opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={fontReady ? { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 } : undefined}
              transition={{ delay: 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="-15 30 50 140" style={{ height: '1.07em', overflow: 'visible' }}>
                <motion.path
                  d={pathJ}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={fontReady ? { pathLength: 1, fillOpacity: 1 } : undefined}
                  transition={{
                    pathLength: { delay: 0.2, duration: 1.8, ease: "easeInOut" },
                    fillOpacity: { delay: 1.4, duration: 0.8, ease: "easeIn" }
                  }}
                />
              </svg>
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
