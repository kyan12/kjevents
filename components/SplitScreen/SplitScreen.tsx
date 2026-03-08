'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SplitScreen.module.css';

export default function SplitScreen() {
  const contentDelay = 3.5;

  return (
    <section className={styles.container}>
      <Link href="/weddings" className={`${styles.half} ${styles.weddings}`}>
        <motion.div 
          className={styles.overlay}
          initial={{ backgroundColor: 'rgba(50, 59, 74, 0.5)' }}
          whileHover={{ backgroundColor: 'rgba(50, 59, 74, 0.2)' }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: contentDelay, duration: 1 }}
        >
          <span className={styles.category}>Kira Jia</span>
          <h2 className={styles.title}>Weddings</h2>
          <span className={styles.exploreBtn}>Explore</span>
        </motion.div>
      </Link>

      <Link href="/events" className={`${styles.half} ${styles.otherEvents}`}>
        <motion.div 
          className={styles.overlay}
          initial={{ backgroundColor: 'rgba(50, 59, 74, 0.5)' }}
          whileHover={{ backgroundColor: 'rgba(50, 59, 74, 0.2)' }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: contentDelay + 0.2, duration: 1 }}
        >
          <span className={styles.category}>Kira Jia</span>
          <h2 className={styles.title}>Events</h2>
          <span className={styles.exploreBtn}>Explore</span>
        </motion.div>
      </Link>
    </section>
  );
}
