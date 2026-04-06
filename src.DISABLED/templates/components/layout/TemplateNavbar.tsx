import React, { useState } from 'react';
import styles from './TemplateNavbar.module.css';
import { ThemeSelector } from '../ThemeSelector';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface MenuItem {
  label: string;
  href: string;
}

interface TemplateNavbarProps {
  logo?: string;
  menuItems: MenuItem[];
  ctaText?: string;
  ctaLink?: string;
  showThemeSelector?: boolean;
  onThemeChange?: (theme: string) => void;
}

export const TemplateNavbar: React.FC<TemplateNavbarProps> = ({
  logo = 'Brand',
  menuItems,
  ctaText,
  ctaLink,
  showThemeSelector = true,
  onThemeChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        {logo}
      </div>

      {/* Menu desktop */}
      <div className={styles.menuDesktop}>
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className={styles.menuItem}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Actions droite */}
      <div className={styles.actions}>
        {ctaText && ctaLink && (
          <a href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </a>
        )}
        
        {showThemeSelector && (
          <div className={styles.themeSelectorWrapper}>
            <ThemeSelector onThemeChange={onThemeChange} />
          </div>
        )}

        {/* Burger mobile */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <>
          <div 
            className={styles.mobileOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={styles.mobileMenu}>
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className={styles.mobileMenuItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {ctaText && ctaLink && (
              <a 
                href={ctaLink} 
                className={styles.mobileCta}
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaText}
              </a>
            )}
          </div>
        </>
      )}
    </nav>
  );
};