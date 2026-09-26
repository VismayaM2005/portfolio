'use client';

import { useEffect, useState } from 'react';
import styles from './ReaderThemeToggle.module.css';

export default function ReaderThemeToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute('data-reading-theme');
    };
  }, []);

  function toggle() {
    const next = !night;
    setNight(next);
    if (next) {
      document.documentElement.setAttribute('data-reading-theme', 'night');
    } else {
      document.documentElement.removeAttribute('data-reading-theme');
    }
  }

  return (
    <button className={styles.btn} onClick={toggle}>
      {night ? '☀️ Day mode' : '🌙 Night mode'}
    </button>
  );
}
