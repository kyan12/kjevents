'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  theme?: 'default' | 'events';
}

export default function ContactForm({ theme = 'default' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${styles.contactSection} ${theme === 'events' ? styles.eventsTheme : ''}`}>
      <div className={styles.formContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Inquire</h2>
          <p className={styles.subtitle}>
            We would love to hear from you. Please share the details of your upcoming celebration, 
            and we will be in touch shortly to schedule a consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input type="text" id="name" name="name" className={styles.inputField} required disabled={isSubmitting} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" name="email" className={styles.inputField} required disabled={isSubmitting} />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="eventType" className={styles.label}>Event Type</label>
              <select id="eventType" name="eventType" className={styles.selectField} required disabled={isSubmitting}>
                <option value="">Select an option</option>
                <option value="Wedding - Full Planning">Wedding - Full Planning</option>
                <option value="Wedding - Partial Planning">Wedding - Partial Planning</option>
                <option value="Wedding - Day Management">Wedding - Day Management</option>
                <option value="Special/Private Event">Special/Private Event</option>
                <option value="Festival/Stage Production">Festival/Stage Production</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="eventDate" className={styles.label}>Estimated Date</label>
              <input type="date" id="eventDate" name="eventDate" className={styles.inputField} disabled={isSubmitting} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>Tell us about your event</label>
            <textarea id="message" name="message" className={styles.textareaField} rows={5} required disabled={isSubmitting}></textarea>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
          </button>

          {status === 'success' && (
            <p className={styles.successMessage}>Thank you for your inquiry. We will be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className={styles.errorMessage}>Something went wrong. Please try again later.</p>
          )}
        </form>
      </div>
    </section>
  );
}
