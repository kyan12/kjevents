"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './WeddingContact.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.get('firstName')} ${formData.get('lastName')}`,
          email: formData.get('email'),
          eventType: 'Wedding Inquiry',
          eventDate: formData.get('weddingDate'),
          message: formData.get('vision'),
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wedding-contact" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          GET IN TOUCH
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          &ldquo;Every great wedding begins with a single conversation.&rdquo;
        </motion.h2>
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          custom={2}
          variants={fadeInUp}
        >
          <div className={styles.row}>
            <input
              name="firstName"
              placeholder="FIRST NAME"
              className={styles.input}
              required
              disabled={isSubmitting}
            />
            <input
              name="lastName"
              placeholder="LAST NAME"
              className={styles.input}
              required
              disabled={isSubmitting}
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="EMAIL ADDRESS"
            className={`${styles.input} ${styles.fullWidth}`}
            required
            disabled={isSubmitting}
          />
          <input
            name="weddingDate"
            placeholder="WEDDING DATE (approximate is fine)"
            className={`${styles.input} ${styles.fullWidth}`}
            disabled={isSubmitting}
          />
          <textarea
            name="vision"
            placeholder="TELL US ABOUT YOUR VISION"
            rows={4}
            className={`${styles.textarea} ${styles.fullWidth}`}
            required
            disabled={isSubmitting}
          />
          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            custom={3}
            variants={fadeInUp}
          >
            {isSubmitting ? 'SENDING...' : 'BEGIN YOUR STORY \u2192'}
          </motion.button>
        </motion.form>
        {status === 'success' && (
          <p className={styles.successMsg}>Thank you for your inquiry. We will be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>Something went wrong. Please try again later.</p>
        )}
        <motion.p className={styles.footnote} custom={3.8} variants={fadeInUp}>
          We respond to every inquiry within 48 hours.
        </motion.p>
      </motion.div>
    </section>
  );
}
