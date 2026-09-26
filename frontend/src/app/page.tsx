import Link from 'next/link';
import { getBooks, getGenres } from '@/lib/api';
import BookCover from '@/components/BookCover';
import LibraryGrid from '@/components/LibraryGrid';
import styles from './page.module.css';

export default async function Home() {
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);
  const ongoing = books.find((b) => b.storyStatus === 'ongoing');

  return (
    <main>
      <section className={styles.hero}>
        <div className="wrap">
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Bengaluru, India</span>
            <h1 className={styles.h1}>
              Vismaya <span>M</span>
            </h1>
            <p className={styles.lede}>
              Final-year CSE engineer working across AI, IoT, and backend systems. One filed
              patent, one SCOPUS-indexed publication, three internships, eleven shipped projects.
              Each one below has its own page: the stack, the role, the metrics, and what actually
              went wrong along the way.
            </p>
            <div className={styles.ctaRow}>
              <Link href="#library" className={`${styles.btn} ${styles.btnPrimary}`}>
                Browse the library
              </Link>
              <Link href="/author" className={`${styles.btn} ${styles.btnGhost}`}>
                About the author
              </Link>
            </div>
          </div>
        </div>
      </section>

      {ongoing && (
        <section className={styles.continue}>
          <div className="wrap">
            <Link href={`/book/${ongoing.slug}`} className={styles.continueCard}>
              <div className={styles.continueCover}>
                <BookCover book={ongoing} priority />
              </div>
              <div>
                <p className={styles.continueLabel}>▶ CONTINUE READING</p>
                <h2 className={styles.continueTitle}>{ongoing.title}</h2>
                <p className={styles.continueBlurb}>{ongoing.blurb}</p>
              </div>
              <span className={styles.continueArrow}>OPEN →</span>
            </Link>
          </div>
        </section>
      )}

      <section className={styles.section} id="library">
        <div className="wrap">
          <div className={styles.sectionHead}>
            <h2>The Library</h2>
            <p>{books.length} books · filter by genre</p>
          </div>
          <LibraryGrid books={books} genres={genres} />
        </div>
      </section>
    </main>
  );
}
