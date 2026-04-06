import React from 'react';
import styles from './Footer.module.css';
import type { FooterSection } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface FooterProps {
  brand?: string;
  copyright?: string;
  sections?: FooterSection[];
  socialLinks?: {
    platform: string;
    url: string;
    icon?: string;
  }[];
}

export const Footer: React.FC<FooterProps> = ({
  brand = 'Brand',
  copyright,
  sections = [],
  socialLinks = []
}) => {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${brand}. Tous droits réservés.`;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <div className={styles.brand}>{brand}</div>
            <p className={styles.copyright}>
              {copyright || defaultCopyright}
            </p>
          </div>
          
          {sections.length > 0 && (
            <div className={styles.sections}>
              {sections.map((section, index) => (
                <div key={index} className={styles.section}>
                  <h4 className={styles.sectionTitle}>{section.title}</h4>
                  <ul className={styles.sectionLinks}>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className={styles.link}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {socialLinks.length > 0 && (
            <div className={styles.socialSection}>
              <h4 className={styles.sectionTitle}>Suivez-nous</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon && <span className={styles.socialIcon}>{social.icon}</span>}
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};