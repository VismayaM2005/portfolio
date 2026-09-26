'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '/', label: 'Library' },
  { href: '/author', label: 'About the Author' },
  { href: '/contact', label: 'Message Me' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.mark}>V</span>
          <span className={styles.brandText}>vismaya.writes</span>
        </Link>

        <nav className={styles.links} data-open={open}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
