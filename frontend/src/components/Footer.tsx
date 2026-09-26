import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.inner}`}>
        <span>© {year} Vismaya M — every word above is about something that actually got built</span>
        <span>
          <a href="https://github.com/vismayaM-2005" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' · '}
          <a href="https://linkedin.com/in/vismaya-m-b381a8243" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </span>
      </div>
    </footer>
  );
}
