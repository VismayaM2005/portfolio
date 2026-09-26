import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBook, getBooks } from '@/lib/api';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import QAAccordion from '@/components/QAAccordion';
import ReadingProgress from '@/components/ReadingProgress';
import ReaderThemeToggle from '@/components/ReaderThemeToggle';
import styles from './page.module.css';

async function fetchBookSafe(slug: string) {
  try {
    return await getBook(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await fetchBookSafe(slug);
  return { title: book ? `${book.title} — Vismaya M` : 'Book — Vismaya M' };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [book, allBooks] = await Promise.all([fetchBookSafe(slug), getBooks()]);
  if (!book) notFound();

  const related = allBooks
    .filter((b) => b.slug !== book.slug && (b.genre === book.genre || b.domains.some((d) => book.domains.includes(d))))
    .slice(0, 3);

  return (
    <main>
      <header className={styles.header}>
        <div className="wrap">
          <Link href="/" className={styles.back}>
            ← Back to the Library
          </Link>
          <div className={styles.headerGrid}>
            <div>
              <BookCover book={book} priority size="hero" />
            </div>
            <div>
              <span className={styles.genre}>{book.genre}</span>
              {book.tags.length > 0 && (
                <div className={styles.tagRow}>
                  {book.tags.map((t) => (
                    <span key={t} className={styles.tagChip}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className={styles.title}>{book.title}</h1>
              <p className={styles.subtitle}>{book.subtitle}</p>
              <p className={styles.byline}>
                by <b>Vismaya M</b> · {book.kind === 'internship' ? 'Internship' : 'Project'}
              </p>

              {book.status.length > 0 && (
                <div className={styles.statusRow}>
                  {book.status.map((s) => (
                    <span key={s} className={styles.statusChip}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <p className={styles.blurb}>{book.blurb}</p>

              {book.techStack.length > 0 && (
                <div className={styles.chipRow}>
                  {book.techStack.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.metaRow}>
                <span className={`${styles.badge} ${styles.badgeReads}`}>📖 {book.chapterCount} chapters</span>
                <span className={`${styles.badge} ${styles.badgeTime}`}>⏱ {book.readMinutes} min read</span>
                <span className={`${styles.badge} ${styles.badgeStatus}`}>
                  {book.storyStatus === 'ongoing' ? '🟢 Ongoing' : '✅ Completed'}
                </span>
              </div>

              <div className={styles.ctaRow}>
                <Link href="#chapters" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Start Reading →
                </Link>
                {book.repoUrl ? (
                  <a href={book.repoUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
                    View Repository ↗
                  </a>
                ) : (
                  <span className={`${styles.btn} ${styles.btnGhost}`} style={{ cursor: 'default' }}>
                    Source: private
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ReadingProgress targetId="chapters" />

      <section className={styles.body} id="chapters">
        <div className={`wrap ${styles.layout}`}>
          <aside className={styles.toc}>
            <p className={styles.tocLabel}>Table of Contents</p>
            <ul className={styles.tocList}>
              {book.chapters.map((ch, i) => (
                <li key={ch.title}>
                  <a href={`#ch-${i}`}>
                    <span className={styles.tocNum}>{i + 1}.</span> {ch.title}
                  </a>
                </li>
              ))}
              {book.qa.length > 0 && (
                <li>
                  <a href="#ask-the-author">
                    <span className={styles.tocNum}>+</span> Ask the Author
                  </a>
                </li>
              )}
            </ul>
            <div className={styles.themeToggleWrap}>
              <ReaderThemeToggle />
            </div>
          </aside>

          <div>
            {book.chapters.map((ch, i) => (
              <article key={ch.title} className={styles.chapter} id={`ch-${i}`}>
                <p className={styles.chapterEyebrow}>Chapter {i + 1}</p>
                <h2 className={styles.chapterTitle}>{ch.title}</h2>
                <p className={styles.hook}>{ch.hook}</p>
                {ch.body.length > 0 && (
                  <div className={styles.chapterBody}>
                    {ch.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                )}
                {ch.bullets.length > 0 && (
                  <ul className={styles.bulletList}>
                    {ch.bullets.map((b) => (
                      <li key={b.slice(0, 50)}>{b}</li>
                    ))}
                  </ul>
                )}
                {ch.metrics.length > 0 && (
                  <div className={styles.metricsGrid}>
                    {ch.metrics.map((m) => (
                      <div key={m.label} className={styles.metric}>
                        <span>{m.label}</span>
                        <b>{m.value}</b>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {book.qa.length > 0 && (
              <div className={styles.qaSection} id="ask-the-author">
                <h2>Ask the Author</h2>
                <p>Real questions from real interviews, answered honestly.</p>
                <QAAccordion items={book.qa} />
              </div>
            )}

            {related.length > 0 && (
              <div className={styles.related}>
                <h2>You might also like</h2>
                <div className={styles.relatedGrid}>
                  {related.map((b) => (
                    <BookCard key={b.slug} book={b} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
