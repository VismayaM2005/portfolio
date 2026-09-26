import type { Metadata } from 'next';
import { getProfile } from '@/lib/api';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Contact — Vismaya M' };

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <span className="mono-label">✉ Message the author</span>
          <h1>Let&apos;s talk</h1>
          <p>Open for internships, research collaboration, and full-time roles — real replies, not an autoresponder.</p>
        </div>
      </header>

      <section className={styles.body}>
        <div className={`wrap ${styles.layout}`}>
          <ContactForm />

          <div className={styles.directList}>
            <div className={styles.directItem}>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className={styles.directItem}>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </div>
            <div className={styles.directItem}>
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {profile.linkedin.replace('https://', '')}
              </a>
            </div>
            <div className={styles.directItem}>
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                {profile.github.replace('https://', '')}
              </a>
            </div>
            <div className={styles.directItem}>
              <span>Location</span>
              <b>{profile.location}</b>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
