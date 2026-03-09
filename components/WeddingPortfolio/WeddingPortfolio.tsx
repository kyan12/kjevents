"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './WeddingPortfolio.module.css';

const images = [
  { src: '/images/jialin-jonathan-ceremony.jpg', alt: 'Jialin & Jonathan ceremony', title: 'Jialin & Jonathan', photographer: 'Justin Jun Lee', photographerUrl: 'https://www.justinleeweddings.com' },
  { src: '/images/felicity-stairs-group.jpg', alt: 'Felicity & Leon staircase group', title: 'Felicity & Leon', photographer: 'Alex Gooden' },
  { src: '/images/wedding_bouquet.jpg', alt: 'Wedding bouquet detail', title: 'Bouquet Detail', photographer: 'Studio TBD' },
  { src: '/images/felicity-detail.jpg', alt: 'Felicity & Leon invitation details', title: 'Felicity & Leon', photographer: 'Alex Gooden' },
  { src: '/images/wedding_mansion_ext.jpg', alt: 'Wedding mansion exterior', title: 'Venue Exterior', photographer: 'Studio TBD' },
  { src: '/images/felicity-flowers.jpg', alt: 'Felicity & Leon bridal bouquet', title: 'Felicity & Leon', photographer: 'Alex Gooden' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingPortfolio() {
  const [galleryMainIndex, setGalleryMainIndex] = useState<number | null>(null);
  const [activeMobilePhoto, setActiveMobilePhoto] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryOpen = galleryMainIndex !== null;

  useEffect(() => {
    if (galleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [galleryOpen]);

  return (
    <>
      <section id="wedding-portfolio" className={styles.section}>
        <motion.div
          className={styles.container}
          ref={containerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col items-center text-center mb-[64px] md:mb-[100px] gap-4">
            <div>
              <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
                OUR WORK
              </motion.p>
              <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
                Moments We&rsquo;ve Had the<br />Honor of Holding
              </motion.h2>
              <motion.p className={styles.subLabel} custom={1.5} variants={fadeInUp}>
                CAPTURED BY AWARD-WINNING PHOTOGRAPHERS
              </motion.p>
            </div>
          </div>

          {/* Desktop Masonry (Hidden on Mobile) */}
          <div className={styles.desktopMasonry}>
            {/* Column 1 */}
            <div className={styles.masonryCol}>
              {[0, 1].map((i) => {
                const img = images[i];
                const aspectRatio = i === 0 ? '5/6.6' : '5/4.2';
                return (
                  <motion.div
                    key={i}
                    className={styles.masonryItem}
                    custom={i + 2}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    onClick={() => setGalleryMainIndex(i)}
                  >
                    <div className={styles.imageWrapper} style={{ aspectRatio }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <p className={styles.overlayTitle}>{img.title}</p>
                        <p className={styles.overlayPhotographer}>
                          {img.photographerUrl ? (
                            <a href={img.photographerUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              {img.photographer}
                            </a>
                          ) : img.photographer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className={styles.masonryCol}>
              {[2, 3].map((i) => {
                const img = images[i];
                const aspectRatio = i === 2 ? '5/5.2' : '5/4.2';
                return (
                  <motion.div
                    key={i}
                    className={styles.masonryItem}
                    custom={i + 2}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    onClick={() => setGalleryMainIndex(i)}
                  >
                    <div className={styles.imageWrapper} style={{ aspectRatio }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <p className={styles.overlayTitle}>{img.title}</p>
                        <p className={styles.overlayPhotographer}>
                          {img.photographerUrl ? (
                            <a href={img.photographerUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              {img.photographer}
                            </a>
                          ) : img.photographer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <motion.button
                className={styles.seeAllBtn}
                variants={fadeInUp}
                onClick={() => setGalleryMainIndex(0)}
              >
                ALL WORK
              </motion.button>
            </div>

            {/* Column 3 */}
            <div className={styles.masonryCol}>
              {[4, 5].map((i) => {
                const img = images[i];
                const aspectRatio = i === 4 ? '5/6.2' : '5/4.8';
                return (
                  <motion.div
                    key={i}
                    className={styles.masonryItem}
                    custom={i + 2}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    onClick={() => setGalleryMainIndex(i)}
                  >
                    <div className={styles.imageWrapper} style={{ aspectRatio }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <p className={styles.overlayTitle}>{img.title}</p>
                        <p className={styles.overlayPhotographer}>
                          {img.photographerUrl ? (
                            <a href={img.photographerUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              {img.photographer}
                            </a>
                          ) : img.photographer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Hero Card Layout */}
          <div className={styles.mobileHeroLayout}>
            <div className={styles.mobileHeroCard}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobilePhoto}
                  className={styles.mobileHeroImageWrap}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={images[activeMobilePhoto].src}
                    alt={images[activeMobilePhoto].alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className={styles.mobileHeroGradient}>
                <p className={styles.mobileHeroTitle}>{images[activeMobilePhoto].title}</p>
                <p className={styles.mobileHeroPhotographer}>{images[activeMobilePhoto].photographer}</p>
              </div>
              {/* Nav arrows */}
              <button
                className={`${styles.mobileHeroNav} ${styles.mobileHeroNavLeft}`}
                onClick={() => setActiveMobilePhoto((p) => (p - 1 + images.length) % images.length)}
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={`${styles.mobileHeroNav} ${styles.mobileHeroNavRight}`}
                onClick={() => setActiveMobilePhoto((p) => (p + 1) % images.length)}
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className={styles.mobileThumbStrip}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.mobileThumb} ${activeMobilePhoto === i ? styles.mobileThumbActive : ''}`}
                  onClick={() => setActiveMobilePhoto(i)}
                  aria-label={`View ${img.title}`}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="56px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            <button
              className={styles.mobileSeeAllBtn}
              onClick={() => setGalleryMainIndex(0)}
            >
              ALL WORK
            </button>
          </div>
        </motion.div>
      </section>

      {/* Featured Gallery Overlay */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className={styles.masterGallery}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.masterHeader}>
              <h3 className={styles.masterTitle}>PORTFOLIO</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setGalleryMainIndex(null)}
              >
                <X size={24} color="var(--w-ink)" />
              </button>
            </div>

            {/* Featured Image */}
            <div className={styles.featuredImageWrap}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryMainIndex}
                  className={styles.featuredImageInner}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={images[galleryMainIndex!].src}
                    alt={images[galleryMainIndex!].alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className={styles.featuredOverlay}>
                    <p className={styles.featuredTitle}>{images[galleryMainIndex!].title}</p>
                    <p className={styles.featuredPhotographer}>
                      Photo by {images[galleryMainIndex!].photographer}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Grid */}
            <div className={styles.masterGrid}>
              {images.map((img, i) => (
                <button
                  key={`gallery-${i}`}
                  className={`${styles.masterGridItem} ${i === galleryMainIndex ? styles.masterGridItemActive : ''}`}
                  onClick={() => setGalleryMainIndex(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
