'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Case Files' },
  { href: '/experience', label: 'Ops Log' },
  { href: '/credentials', label: 'Credentials' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>V</span>
          <span>Vismaya M</span>
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
