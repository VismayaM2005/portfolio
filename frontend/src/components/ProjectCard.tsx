import Link from 'next/link';
import type { ProjectSummary } from '@/lib/types';
import DomainTag from './DomainTag';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.tagRow}>
        {project.domains.map((d) => (
          <DomainTag key={d} domain={d} />
        ))}
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.subtitle}>{project.subtitle}</p>
      <p className={styles.summary}>{project.summary}</p>
      {project.status.length > 0 && (
        <div className={styles.statusRow}>
          {project.status.map((s) => (
            <span key={s} className={styles.status}>
              {s}
            </span>
          ))}
        </div>
      )}
      <div className={styles.readMore}>READ CASE FILE →</div>
    </Link>
  );
}
