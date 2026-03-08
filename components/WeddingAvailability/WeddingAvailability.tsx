import styles from './WeddingAvailability.module.css';

export default function WeddingAvailability() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h3 className={styles.label}>AVAILABILITY</h3>
          <p>
            <strong>2026: </strong>Currently accepting Wedding Day Management Inquiries, with limited Partial Planning engagements.
          </p>
          <p>
            <strong>2027: </strong>Full Planning inquiries are now open.
          </p>
        </div>
        <div className={styles.ctaBlock}>
          <a href="#wedding-contact" className={styles.cta}>
            INQUIRE ABOUT YOUR DATE
          </a>
        </div>
      </div>
    </section>
  );
}
