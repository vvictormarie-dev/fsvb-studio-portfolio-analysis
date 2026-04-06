import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © 2025 FSVB Studio — Solutions digitales premium pour entrepreneurs.
        </p>
        <nav className={styles.links}>
          <a href="/" className={styles.link}>Accueil</a>
          <a href="/templates" className={styles.link}>Templates</a>
          <a href="/projects" className={styles.link}>Projets</a>
          <a href="/contact" className={styles.link}>Contact</a>
        </nav>
        <div className={styles.social}>
          <a href="#" className={styles.link}>LinkedIn</a>
          <a href="#" className={styles.link}>Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
