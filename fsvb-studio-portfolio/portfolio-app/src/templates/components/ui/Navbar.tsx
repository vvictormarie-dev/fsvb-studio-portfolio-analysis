import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import type { NavItem } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface NavbarProps {
  brand?: string;
  logoUrl?: string;
  items: NavItem[];
  transparent?: boolean;
  layout?: 'classic' | 'centered' | 'split';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  brand = 'Brand', 
  logoUrl,
  items, 
  transparent = false,
  layout = 'classic'
}) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} ${transparent ? styles.transparent : ''} ${styles[layout]}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {logoUrl && logoUrl.trim() ? (
            <img 
              src={logoUrl} 
              alt={brand || 'Logo'} 
              onError={(e) => {
                // Fallback au texte si l'image ne charge pas
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.nextSibling) {
                  (target.nextSibling as HTMLElement).style.display = 'inline';
                }
              }}
            />
          ) : null}
          <span style={{ display: logoUrl && logoUrl.trim() ? 'none' : 'inline' }}>
            {brand}
          </span>
        </div>
        
        <button
          className={styles.hamburger}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen(true)}
        >
          &#9776;
        </button>
        
        <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
          <button
            className={styles.closeBtn}
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          
          <ul className={styles.menu}>
            {items.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <Link 
                  to={item.href} 
                  className={`${styles.menuLink} ${item.active ? styles.active : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
      </div>
    </nav>
  );
};