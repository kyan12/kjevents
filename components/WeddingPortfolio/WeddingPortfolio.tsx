"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from './WeddingPortfolio.module.css';

const images = [
  { src: '/images/jialin-jonathan-ceremony.jpg', alt: 'Jialin & Jonathan ceremony' },
  { src: '/images/felicity-stairs-group.jpg', alt: 'Felicity & Leon staircase group' },
  { src: '/images/wedding_bouquet.jpg', alt: 'Wedding bouquet detail' },
  { src: '/images/felicity-detail.jpg', alt: 'Felicity & Leon invitation details' },
  { src: '/images/wedding_mansion_ext.jpg', alt: 'Wedding mansion exterior' },
  { src: '/images/felicity-flowers.jpg', alt: 'Felicity & Leon bridal bouquet' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingPortfolio() {
  return (
    <section id="wedding-portfolio" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          OUR WORK
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          Moments We&rsquo;ve Had the<br />Honor of Holding
        </motion.h2>
        <div className={styles.masonry}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={styles.masonryItem}
              custom={i + 2}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
