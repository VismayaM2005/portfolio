'use client';

import { useState, type FormEvent } from 'react';
import { postContact } from '@/lib/api';
import styles from './ContactForm.module.css';

type Status = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string };

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      await postContact({ name, email, message });
      setStatus({ kind: 'ok', message: 'Sent — thanks, I’ll get back to you soon.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit" className={styles.submit} disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'SENDING…' : 'SEND MESSAGE →'}
      </button>
      {status.kind === 'ok' && <p className={`${styles.status} ${styles.statusOk}`}>{status.message}</p>}
      {status.kind === 'error' && <p className={`${styles.status} ${styles.statusErr}`}>{status.message}</p>}
    </form>
  );
}
