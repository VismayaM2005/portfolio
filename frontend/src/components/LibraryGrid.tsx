'use client';

import { useMemo, useState } from 'react';
import type { BookSummary, Genre } from '@/lib/types';
import BookCard from './BookCard';
import styles from './LibraryGrid.module.css';

export default function LibraryGrid({ books, genres }: { books: BookSummary[]; genres: Genre[] }) {
  const [genre, setGenre] = useState<string | null>(null);

  const filtered = useMemo(
    () => (genre ? books.filter((b) => b.genre === genre) : books),
    [books, genre],
  );

  const projects = filtered.filter((b) => b.kind === 'project');
  const internships = filtered.filter((b) => b.kind === 'internship');

  return (
    <div>
      <div className={styles.filters}>
        <button className={styles.pill} data-active={genre === null} onClick={() => setGenre(null)}>
          All Genres ({books.length})
        </button>
        {genres.map((g) => (
          <button
            key={g.name}
            className={styles.pill}
            data-active={genre === g.name}
            onClick={() => setGenre(g.name)}
          >
            {g.name} ({g.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p className={styles.empty}>Nothing on the shelf for this genre yet.</p>}

      {projects.length > 0 && (
        <>
          <h3 className={styles.shelfTitle}>📚 Projects</h3>
          <div className={styles.grid}>
            {projects.map((b, i) => (
              <BookCard key={b.slug} book={b} priority={i < 4} />
            ))}
          </div>
        </>
      )}

      {internships.length > 0 && (
        <>
          <h3 className={styles.shelfTitle}>💼 Internships</h3>
          <div className={styles.grid}>
            {internships.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
