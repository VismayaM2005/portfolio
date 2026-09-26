import { DOMAIN_META } from '@/lib/domains';
import styles from './DomainTag.module.css';

export default function DomainTag({ domain }: { domain: string }) {
  const meta = DOMAIN_META[domain];
  if (!meta) return null;
  return (
    <span
      className={styles.tag}
      style={{ ['--dot-color' as string]: meta.color }}
    >
      <span className={styles.dot} />
      {meta.short}
    </span>
  );
}
