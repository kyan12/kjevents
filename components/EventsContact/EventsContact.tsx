"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './EventsContact.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

const budgetOptions = [
  'Under $25K',
  '$25K \u2013 $75K',
  '$75K \u2013 $150K',
  '$150K \u2013 $500K',
  '$500K+',
];

export default function EventsContact() {
  const [budget, setBudget] = useState('');
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
          name: formData.get('yourName'),
          email: formData.get('email'),
          eventType: `Events - ${formData.get('organization')} (${formData.get('title')})`,
          message: `Organization: ${formData.get('organization')}\nTitle: ${formData.get('title')}\nPhone: ${formData.get('phone')}\nBudget: ${budget}\n\n${formData.get('brief')}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setBudget('');
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
    <section id="events-contact" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          START A PROJECT
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          LET&rsquo;S BUILD SOMETHING REMARKABLE.
        </motion.h2>
        <motion.p className={styles.subtext} custom={1.6} variants={fadeInUp}>
          Submit your brief. We acknowledge all inquiries within 24 hours. Complex RFPs receive a formal response within 72 hours.
        </motion.p>
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          custom={2.2}
          variants={fadeInUp}
        >
          <input
            name="organization"
            placeholder="ORGANIZATION NAME"
            className={`${styles.input} ${styles.fullWidth}`}
            required
            disabled={isSubmitting}
          />
          <div className={styles.row}>
            <input name="yourName" placeholder="YOUR NAME" className={styles.input} required disabled={isSubmitting} />
            <input name="title" placeholder="YOUR TITLE" className={styles.input} disabled={isSubmitting} />
          </div>
          <div className={styles.row}>
            <input name="email" type="email" placeholder="EMAIL ADDRESS" className={styles.input} required disabled={isSubmitting} />
            <input name="phone" type="tel" placeholder="PHONE NUMBER" className={styles.input} disabled={isSubmitting} />
          </div>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`${styles.select} ${styles.fullWidth} ${!budget ? styles.selectPlaceholder : ''}`}
            disabled={isSubmitting}
          >
            <option value="">ESTIMATED BUDGET RANGE</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <textarea
            name="brief"
            placeholder="PROJECT BRIEF — tell us about your event, vision, and timeline"
            rows={5}
            className={`${styles.textarea} ${styles.fullWidth}`}
            required
            disabled={isSubmitting}
          />
          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            custom={3.2}
            variants={fadeInUp}
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT YOUR BRIEF \u2192'}
          </motion.button>
        </motion.form>
        {status === 'success' && (
          <p className={styles.successMsg}>Thank you. We will be in touch within 24 hours.</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>Something went wrong. Please try again later.</p>
        )}
      </motion.div>
    </section>
  );
}
