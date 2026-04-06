import React from 'react';
import styles from './TemplateFooter.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface TemplateFooterProps {
  companyName: string;
  description?: string;
  links: FooterLink[];
  socialLinks: SocialLink[];
  email?: string;
  phone?: string;
  address?: string;
}

export const TemplateFooter: React.FC<TemplateFooterProps> = ({
  companyName,
  description,
  links,
  socialLinks,
  email,
  phone,
  address
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          {/* Colonne 1 - Informations entreprise */}
          <div className={styles.column}>
            <h3 className={styles.companyName}>{companyName}</h3>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
            
            {/* Liens sociaux */}
            {socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                  >
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 - Liens */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Liens rapides</h4>
            <div className={styles.links}>
              {links.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 3 - Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contact}>
              {email && (
                <a href={`mailto:${email}`} className={styles.contactItem}>
                  📧 {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className={styles.contactItem}>
                  📞 {phone}
                </a>
              )}
              {address && (
                <div className={styles.contactItem}>
                  📍 {address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {currentYear} {companyName}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};