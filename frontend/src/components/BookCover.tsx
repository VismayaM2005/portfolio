import Image from 'next/image';
import type { BookSummary } from '@/lib/types';
import { COVER_COMPONENTS } from './covers';
import styles from './BookCover.module.css';

export default function BookCover({
  book,
  priority = false,
  className,
}: {
  book: Pick<BookSummary, 'title' | 'coverType' | 'coverImage' | 'coverPattern' | 'storyStatus'>;
  priority?: boolean;
  className?: string;
}) {
  const Illustration = book.coverPattern ? COVER_COMPONENTS[book.coverPattern] : undefined;

  return (
    <div className={`${styles.cover} ${className ?? ''}`}>
      {book.coverType === 'photo' && book.coverImage ? (
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 220px, 260px"
          priority={priority}
        />
      ) : Illustration ? (
        <Illustration />
      ) : null}
      {book.storyStatus === 'ongoing' && <span className={styles.statusRibbon}>ONGOING</span>}
    </div>
  );
}
