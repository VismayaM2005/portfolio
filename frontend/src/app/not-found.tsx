import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '120px 32px', textAlign: 'center' }}>
      <p className="mono-label" style={{ marginBottom: 16 }}>404</p>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>This book isn&apos;t on the shelf</h1>
      <p style={{ color: 'var(--ink-dim)', marginBottom: 28 }}>
        That page doesn&apos;t exist, or the backend API isn&apos;t reachable.
      </p>
      <Link href="/" style={{ fontWeight: 700, color: 'var(--orange)' }}>
        ← Back to the Library
      </Link>
    </main>
  );
}
