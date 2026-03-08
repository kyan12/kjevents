"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from './WeddingPhilosophy.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingPhilosophy() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className={styles.textCol}>
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            ABOUT US
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            We believe every marriage deserves a day that feels like you.
          </motion.h2>
          <motion.div className={styles.accentBlock} custom={2} variants={fadeInUp}>
            <p>
              Kira is the founder of Kira Jia Events, a boutique planning studio specializing in refined weddings that thoughtfully bridge cultures and traditions. With a bicultural background and deep understanding of both Western and Asian celebrations, Kira approaches each wedding with discernment, structure, and a strong sense of storytelling.
            </p>
          </motion.div>
          <motion.p className={styles.bodyText} custom={3} variants={fadeInUp}>
            Drawing from extensive experience in event planning and large-scale production management, she brings a balance of creativity and logistical precision to every celebration. We take on a limited number of couples each year &mdash; by design. Our process is intentional, our attention is total, and the results are unlike anyone else&rsquo;s celebration.
          </motion.p>
          <motion.p className={styles.signature} custom={4} variants={fadeInUp}>
            Kira Jia
          </motion.p>
          <motion.p className={styles.signatureRole} custom={4.5} variants={fadeInUp}>
            FOUNDER & LEAD PLANNER
          </motion.p>
        </div>

        <motion.div className={styles.photoCol} custom={1.5} variants={fadeInUp}>
          <div className={styles.photoPrimary}>
            <Image
              src="/images/kira_portrait.jpg"
              alt="Kira Jia"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
