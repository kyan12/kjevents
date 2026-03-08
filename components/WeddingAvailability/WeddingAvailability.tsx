"use client";

import styles from './WeddingAvailability.module.css';

export default function WeddingAvailability() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h3 className={styles.label}>AVAILABILITY</h3>

          <div className={styles.highlightTile}>
            <div className={styles.tileContent}>
              <span className={styles.highlightYear}>2026</span>
              <p className={styles.availabilityText}>
                Taking select bookings for Wedding Day Management, with limited Partial Planning remaining.
              </p>
            </div>
            <a href="#wedding-contact" className={styles.ctaButton}>
              INQUIRE NOW
            </a>
          </div>

          <div className={styles.standardRow}>
            <span className={styles.standardYear}>2027</span>
            <p className={styles.availabilityText}>
              Full Planning inquiries are now open.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
