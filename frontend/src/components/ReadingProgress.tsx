'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setPct(p);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetId]);

  return (
    <div
      style={{
        position: 'sticky',
        top: 68,
        height: 3,
        width: '100%',
        background: 'var(--line)',
        zIndex: 40,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--orange)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}
