import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProject } from '@/lib/api';
import DomainTag from '@/components/DomainTag';
import QAAccordion from '@/components/QAAccordion';
import styles from './page.module.css';

async function fetchProjectSafe(slug: string) {
  try {
    return await getProject(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectSafe(slug);
  return { title: project ? `${project.title} — Vismaya M` : 'Case File — Vismaya M' };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchProjectSafe(slug);
  if (!project) notFound();

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <Link href="/projects" className={styles.back}>
            ← ALL CASE FILES
          </Link>
          <div className={styles.tagRow}>
            {project.domains.map((d) => (
              <DomainTag key={d} domain={d} />
            ))}
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
          {project.status.length > 0 && (
            <div className={styles.statusRow}>
              {project.status.map((s) => (
                <span key={s} className={styles.status}>
                  {s}
                </span>
              ))}
            </div>
          )}
          <p className={styles.team}>{project.team}</p>
        </div>
      </header>

      <section className={styles.body}>
        <div className={`wrap ${styles.layout}`}>
          <div>
            <p className={styles.summary}>{project.summary}</p>

            <div className={styles.block}>
              <h2>My Role</h2>
              <p className={styles.role}>{project.role}</p>
              {project.teammates && <p className={styles.teammates}>{project.teammates}</p>}
            </div>

            {project.whatWorked.length > 0 && (
              <div className={styles.block}>
                <h2>What Worked</h2>
                <ul className={`${styles.bulletList} ${styles.bulletWorked}`}>
                  {project.whatWorked.map((w) => (
                    <li key={w.slice(0, 50)}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.limitations.length > 0 && (
              <div className={styles.block}>
                <h2>Honest Limitations</h2>
                <ul className={`${styles.bulletList} ${styles.bulletLimits}`}>
                  {project.limitations.map((l) => (
                    <li key={l.slice(0, 50)}>{l}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.note && <p className={styles.note}>{project.note}</p>}

            {project.qa.length > 0 && (
              <div className={styles.block} style={{ marginTop: 48 }}>
                <h2>Ask About This Project</h2>
                <QAAccordion items={project.qa} />
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            {project.metrics.length > 0 && (
              <div className={styles.sideBlock}>
                <h3>Verified Metrics</h3>
                {project.metrics.map((m) => (
                  <div key={m.label} className={styles.metricRow}>
                    <span>{m.label}</span>
                    <b>{m.value}</b>
                  </div>
                ))}
              </div>
            )}

            {project.techStack.length > 0 && (
              <div className={styles.sideBlock}>
                <h3>Tech Stack</h3>
                <div className={styles.chipRow}>
                  {project.techStack.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sideBlock}>
              <h3>Source</h3>
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                  VIEW REPOSITORY ↗
                </a>
              ) : (
                <span className={styles.privateTag}>Private / not published</span>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
