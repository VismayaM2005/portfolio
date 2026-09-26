import type { Metadata } from 'next';
import { getCredentials } from '@/lib/api';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Credentials — Vismaya M' };

export default async function CredentialsPage() {
  const { achievements, education, programs, courses } = await getCredentials();

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <span className="mono-label">Credentials</span>
          <h1>Achievements, education & training</h1>
          <p>The record behind the case files: what was recognized, where, and what it took to get there.</p>
        </div>
      </header>

      <section className={styles.body}>
        <div className="wrap">
          <div className={styles.grid}>
            <div className={styles.panel}>
              <h2>Achievements</h2>
              <ul className={styles.achieveList}>
                {achievements.map((a) => (
                  <li key={a.title}>
                    <b>{a.title}</b>
                    {a.detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.panel}>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.school} className={styles.eduRow}>
                  <span>
                    {e.degree} — {e.school}
                  </span>
                  <b>{e.score}</b>
                  <em>{e.period}</em>
                </div>
              ))}
            </div>

            <div className={`${styles.panel} ${styles.panelWide}`}>
              <h2>Training & Programs</h2>
              <div className={styles.programGrid}>
                {programs.map((p) => (
                  <div key={p.title} className={styles.programItem}>
                    <b>{p.title}</b>
                    <span>
                      {p.org}
                      <br />
                      {p.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.panel} ${styles.panelWide}`}>
              <h2>Courses</h2>
              <div className={styles.programGrid}>
                {courses.map((c) => (
                  <div key={c.title} className={styles.programItem}>
                    <b>{c.title}</b>
                    <span>{c.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
