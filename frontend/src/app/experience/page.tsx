import type { Metadata } from 'next';
import { getExperience } from '@/lib/api';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Ops Log — Vismaya M' };

function formatRange(start: string, end?: string | null) {
  const fmt = (d: string) => {
    const [y, m] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <span className="mono-label">Ops Log</span>
          <h1>Three internships, in the field</h1>
          <p>
            Reverse-chronological. Each entry is what actually shipped, not a role description
            copied from an offer letter.
          </p>
        </div>
      </header>

      <section className={styles.body}>
        <div className="wrap">
          <div className={styles.timeline}>
            {experience.map((e) => (
              <div key={e.id} className={styles.entry}>
                <div className={styles.meta}>
                  <span className={styles.statusBadge} data-active={e.status === 'active'}>
                    {e.status === 'active' ? 'ACTIVE' : 'CLOSED'}
                  </span>
                  {formatRange(e.start, e.end)}
                </div>
                <h2 className={styles.role}>
                  {e.role} <span className={styles.org}>— {e.org}</span>
                </h2>
                <ul className={styles.points}>
                  {e.points.map((p) => (
                    <li key={p.slice(0, 50)}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
