import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '120px 32px', textAlign: 'center' }}>
      <p className="mono-label" style={{ marginBottom: 16 }}>404</p>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>No case file here</h1>
      <p style={{ color: 'var(--ink-dim)', marginBottom: 28 }}>
        That project doesn&apos;t exist, or the backend API isn&apos;t reachable.
      </p>
      <Link href="/projects" style={{ fontFamily: 'var(--mono)', color: 'var(--accent-ink)' }}>
        ← BACK TO CASE FILES
      </Link>
    </main>
  );
}
