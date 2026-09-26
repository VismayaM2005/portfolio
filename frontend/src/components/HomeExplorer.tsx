'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { ProjectSummary } from '@/lib/types';
import { DOMAIN_META } from '@/lib/domains';
import NodeGraph from './NodeGraph';
import ProjectCard from './ProjectCard';
import styles from './HomeExplorer.module.css';

export default function HomeExplorer({ projects }: { projects: ProjectSummary[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of projects) {
      for (const d of p.domains) c[d] = (c[d] ?? 0) + 1;
    }
    return c;
  }, [projects]);

  const filtered = useMemo(
    () => (selected ? projects.filter((p) => p.domains.includes(selected)) : []),
    [projects, selected],
  );

  return (
    <section className={styles.section} id="explore">
      <div className="wrap">
        <div className={styles.head}>
          <span className={`mono-label ${styles.eyebrow}`}>00 · Systems Map</span>
          <h2>Four domains, one engineer</h2>
          <p>
            Click a node to see the projects behind it. Every node here has at least two shipped
            projects backing it up — this isn&apos;t a skills cloud.
          </p>
        </div>

        <NodeGraph counts={counts} selected={selected} onSelect={setSelected} />
        <p className={styles.hint}>
          {selected
            ? `Showing ${DOMAIN_META[selected]?.label ?? selected} — click the node again to reset`
            : 'Select a node above to filter'}
        </p>

        {selected && (
          <div className={styles.results}>
            <div className={styles.resultsHead}>
              <span className={styles.resultsTitle}>
                <b>{filtered.length}</b> project{filtered.length === 1 ? '' : 's'} tagged{' '}
                <b>{DOMAIN_META[selected]?.label}</b>
              </span>
              <button className={styles.clear} onClick={() => setSelected(null)}>
                CLEAR FILTER ×
              </button>
            </div>
            <div className={styles.grid}>
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link href="/projects" className={styles.viewAll}>
            VIEW ALL {projects.length} CASE FILES →
          </Link>
        </div>
      </div>
    </section>
  );
}
