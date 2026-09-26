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
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.byline}>by Vismaya M</p>
      <div className={styles.statRow}>
        <span>📖 {book.chapterCount} ch</span>
        <span>⏱ {book.readMinutes}m</span>
      </div>
    </Link>
  );
}
