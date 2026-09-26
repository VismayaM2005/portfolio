import Link from 'next/link';
import Image from 'next/image';
import { getProfile, getProjects, getExperience } from '@/lib/api';
import HomeExplorer from '@/components/HomeExplorer';
import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';

export default async function Home() {
  const [profile, projects, experience] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperience(),
  ]);

  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const current = experience.find((e) => e.status === 'active') ?? experience[0];

  return (
    <main>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <span className={`mono-label ${styles.eyebrow}`}>Case files, not a resume clone</span>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.tagline}>{profile.tagline}</p>
            <p className={styles.abstract}>{profile.abstract}</p>
            <div className={styles.ctaRow}>
              <Link href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                READ CASE FILES →
              </Link>
              <a href={profile.resumeUrl} className={`${styles.btn} ${styles.btnGhost}`} download>
                DOWNLOAD RESUME ⇩
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnIcon}`}
              >
                GITHUB ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnIcon}`}
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>

          <div>
            <div className={styles.photoFrame}>
              <Image
                src="/profile.jpg"
                alt={profile.name}
                fill
                sizes="(max-width: 900px) 200px, 260px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <p className={styles.photoCaption}>{profile.name} — {profile.location}</p>

            <div className={styles.statStrip}>
              {profile.stats.map((s) => (
                <div key={s.label} className={styles.statBlock}>
                  <b>{s.value}</b>
                  <span>{s.label.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeExplorer projects={projects} />

      <section className={styles.section}>
        <div className="wrap">
          <div className={styles.sectionHead}>
            <div>
              <span className="mono-label">01 · Featured</span>
              <h2>Start here</h2>
            </div>
            <Link href="/projects" className={styles.sectionLink}>
              ALL CASE FILES →
            </Link>
          </div>
          <div className={styles.grid}>
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {current && (
        <section className={styles.section}>
          <div className="wrap">
            <div className={styles.sectionHead}>
              <div>
                <span className="mono-label">02 · Currently</span>
                <h2>What I&apos;m building right now</h2>
              </div>
              <Link href="/experience" className={styles.sectionLink}>
                FULL OPS LOG →
              </Link>
            </div>
            <div className={styles.opsTeaser}>
              <h3>
                {current.role} <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>— {current.org}</span>
              </h3>
              <p className={styles.opsOrg}>{current.start} — {current.end ?? 'Present'}</p>
              {current.points.slice(0, 2).map((pt) => (
                <p key={pt.slice(0, 40)} className={styles.opsPoint}>
                  {pt}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
