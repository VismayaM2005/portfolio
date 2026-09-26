import Link from 'next/link';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/api';
import { DOMAIN_ORDER, DOMAIN_META } from '@/lib/domains';
import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Case Files — Vismaya M',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const { domain } = await searchParams;
  const activeDomain = domain && DOMAIN_ORDER.includes(domain) ? domain : undefined;

  const allProjects = await getProjects();
  const projects = activeDomain ? allProjects.filter((p) => p.domains.includes(activeDomain)) : allProjects;
  const countFor = (d: string) => allProjects.filter((p) => p.domains.includes(d)).length;

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <span className="mono-label">Case Files</span>
          <h1>Eleven builds, four domains</h1>
          <p>
            Every entry here is a real project: role, what worked, what I&apos;d change, and the
            metrics that are actually verified — not a portfolio-polished résumé line.
          </p>
          <div className={styles.filters}>
            <Link href="/projects" className={styles.pill} data-active={!activeDomain}>
              ALL ({allProjects.length})
            </Link>
            {DOMAIN_ORDER.map((d) => (
              <Link
                key={d}
                href={`/projects?domain=${d}`}
                className={styles.pill}
                data-active={activeDomain === d}
              >
                {DOMAIN_META[d].label.toUpperCase()} ({countFor(d)})
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.body}>
        <div className="wrap">
          {projects.length === 0 ? (
            <p className={styles.empty}>No projects tagged for this domain yet.</p>
          ) : (
            <div className={styles.grid}>
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
