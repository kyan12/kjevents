"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from './WeddingTestimonials.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.15 },
  }),
};

const testimonials = [
  {
    quote: "Kira brought structure, calm, and intention to every part of our wedding. She understood exactly how to blend our traditions while keeping the entire day elegant and seamless. From planning through day-of coordination, she was incredibly organized, proactive with vendors and family, and always one step ahead. Because of her, we were fully present and able to enjoy every moment without stress.",
    name: "JIALIN & JONATHAN",
    detail: "New York, 2024",
    featuredImage: { src: '/images/jialin-jonathan-ceremony.jpg', alt: 'Jialin & Jonathan wedding ceremony' },
    detailImage: null as { src: string; alt: string } | null,
    imagePosition: 'left' as const,
  },
  {
    quote: "Set within the historic Mansion at Glen Cove, our wedding brought together timeless romance with meaningful cultural traditions. Kira\u2019s full-service planning from concept development through execution made every detail feel intentional. Her bilingual coordination with vendors, guests, and family was invaluable.",
    name: "FELICITY & LEON",
    detail: "The Mansion at Glen Cove, Long Island",
    featuredImage: { src: '/images/felicity-stairs-couple.jpg', alt: 'Felicity & Leon on the staircase' },
    detailImage: { src: '/images/felicity-detail.jpg', alt: 'Felicity & Leon invitation details' },
    imagePosition: 'right' as const,
  },
];

export default function WeddingTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.preLabel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          KIND WORDS
        </motion.p>

        <div className={styles.storyList}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className={`${styles.storyCard} ${t.imagePosition === 'right' ? styles.storyCardAlt : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div className={styles.photoCol} custom={0} variants={fadeInUp}>
                <div className={styles.photoPrimary}>
                  <Image
                    src={t.featuredImage.src}
                    alt={t.featuredImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {t.detailImage && (
                  <div className={styles.photoSecondary}>
                    <Image
                      src={t.detailImage.src}
                      alt={t.detailImage.alt}
                      fill
                      sizes="(max-width: 768px) 60vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div className={styles.textCol} custom={1} variants={fadeInUp}>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.divider} />
                <p className={styles.name}>{t.name}</p>
                <p className={styles.detail}>{t.detail}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
