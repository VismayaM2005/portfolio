import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProfile, getCredentials, getBooks } from '@/lib/api';
import BookCard from '@/components/BookCard';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'About the Author — Vismaya M' };

export default async function AuthorPage() {
  const [profile, credentials, books] = await Promise.all([getProfile(), getCredentials(), getBooks()]);
  const { achievements, education, programs, courses } = credentials;

  const projectCount = books.filter((b) => b.kind === 'project').length;
  const internshipCount = books.filter((b) => b.kind === 'internship').length;

  return (
    <main>
      <header className={styles.header}>
        <div className={`wrap ${styles.headerGrid}`}>
          <div className={styles.avatarWrap}>
            <Image src={profile.photoUrl} alt={profile.name} fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.penName}>@{profile.penName}</p>
            <p className={styles.tagline}>{profile.tagline} · {profile.location}</p>
            <div className={styles.statRow}>
              <div className={styles.statBlock}>
                <b>{projectCount}</b>
                <span>Project books</span>
              </div>
              <div className={styles.statBlock}>
                <b>{internshipCount}</b>
                <span>Internship books</span>
              </div>
              {profile.stats.map((s) => (
                <div key={s.label} className={styles.statBlock}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className={styles.body}>
        <div className="wrap">
          <p className={styles.bio}>{profile.bio}</p>

          <div className={styles.panel} style={{ marginBottom: 20 }}>
            <h2>Works ({books.length})</h2>
            <div className={styles.worksGrid}>
              {books.slice(0, 6).map((b) => (
                <BookCard key={b.slug} book={b} />
              ))}
            </div>
            <Link href="/" className={styles.worksLink}>
              View full library →
            </Link>
          </div>

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

          <div className={styles.messageCta}>
            <p>Open for internships, research collaboration, and full-time roles.</p>
            <Link href="/contact" className={styles.messageBtn}>
              Message Vismaya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
