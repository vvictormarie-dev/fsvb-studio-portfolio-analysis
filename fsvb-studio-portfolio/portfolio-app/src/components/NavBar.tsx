
import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>FSVB Studio</div>
      <button
        className={styles.hamburger}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen(true)}
      >
        &#9776;
      </button>
      <div className={styles.sidebar + (open ? ' ' + styles.open : '')}>
        <button
          className={styles.closeBtn}
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <ul className={styles.sidebarMenu}>
          <li><Link to="/" onClick={() => setOpen(false)}>Accueil</Link></li>
          <li><Link to="/solutions" onClick={() => setOpen(false)}>Nos Solutions</Link></li>
          <li><Link to="/configurator" onClick={() => setOpen(false)}>Configurateur</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>À propos</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
      </div>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </nav>
  );
};

export default NavBar;
