import Link from 'next/link';
import type { BookSummary } from '@/lib/types';
import BookCover from './BookCover';
import styles from './BookCard.module.css';

export default function BookCard({ book, priority = false }: { book: BookSummary; priority?: boolean }) {
  return (
    <Link href={`/book/${book.slug}`} className={styles.card}>
      <div className={styles.coverWrap}>
        <BookCover book={book} priority={priority} />
      </div>
      <span className={styles.genre}>{book.genre}</span>
      {book.tags.length > 0 && (
        <div className={styles.tagRow}>
          {book.tags.slice(0, 3).map((t) => (
            <span key={t} className={styles.tag}>
              #{t}
            </span>
          ))}
        </div>
      )}
      <div className={styles.statRow}>
        <span className={`${styles.badge} ${styles.badgeReads}`}>📖 {book.chapterCount}</span>
        <span className={`${styles.badge} ${styles.badgeTime}`}>⏱ {book.readMinutes}m</span>
      </div>
    </Link>
  );
}
