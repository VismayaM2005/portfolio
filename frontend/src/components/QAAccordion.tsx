'use client';

import { useState } from 'react';
import type { QAItem } from '@/lib/types';
import styles from './QAAccordion.module.css';

export default function QAAccordion({ items }: { items: QAItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className={styles.item}>
            <button
              className={styles.question}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className={styles.icon}>+</span>
            </button>
            <div className={styles.answer} data-open={isOpen}>
              <p className={styles.answerInner}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
