"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
  const [showMasterAlbum, setShowMasterAlbum] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeBento, setActiveBento] = useState<number | null>(0);

  useEffect(() => {
    if (showMasterAlbum) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showMasterAlbum]);

  return (
    <>
      <section id="wedding-portfolio" className={styles.section}>
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col mb-[72px] md:mb-[120px] gap-8">
            <div>
              <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
                OUR WORK
              </motion.p>
              <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
                Moments We&rsquo;ve Had the<br />Honor of Holding
              </motion.h2>
            </div>
          </div>

          {/* Desktop Masonry (Hidden on Mobile) */}
          <div className={styles.desktopMasonry}>
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

          <div className={styles.desktopCtaRow}>
            <motion.button
              className={styles.seeAllBtn}
              variants={fadeInUp}
              onClick={() => setShowMasterAlbum(true)}
            >
              SEE ALL WORK
            </motion.button>
          </div>

          {/* Mobile Stable Linear Bento Grid */}
          <div className={styles.mobileLinearGrid}>
            {images.map((img, i) => {
              const isHero = i === 0 || i === 3;
              const isExpanded = activeBento === i;
              return (
                <div
                  key={`bento-${i}`}
                  className={`${styles.mobileTile} ${isHero ? styles.mobileTileHero : ''} ${isExpanded ? styles.expanded : ''}`}
                  onClick={() => isHero ? setActiveBento(isExpanded ? null : i) : undefined}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  {isHero && <div className={styles.bentoOverlay} />}
                </div>
              );
            })}
            <button
              className={styles.mobileSeeAllBtn}
              onClick={() => setShowMasterAlbum(true)}
            >
              SEE ALL WORK
            </button>
          </div>
        </motion.div>
      </section>

      {/* Master Gallery Overlay */}
      <AnimatePresence>
        {showMasterAlbum && (
          <motion.div
            className={styles.masterGallery}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.masterHeader}>
              <h3 className={styles.masterTitle}>MASTER ALBUM</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowMasterAlbum(false)}
              >
                <X size={24} color="var(--w-ink)" />
              </button>
            </div>
            <div className={styles.masterGrid}>
              {/* Loop images multiple times just to show a full gallery visually */}
              {[...images, ...images, ...images].map((img, i) => (
                <div key={`master-${i}`} className={styles.masterGridItem}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
