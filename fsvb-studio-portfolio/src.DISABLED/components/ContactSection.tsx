import React from 'react';
import styles from './ContactSection.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

const ContactSection: React.FC = () => {
  return (
    <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.contactSection}>
      <div className="wrapper">
        <h2 className={styles.title}>Une idée, un projet ?</h2>
        <p className={styles.text}>
          Discutons ensemble de votre projet web, de vos besoins ou de vos envies. Je vous accompagne pour créer une expérience sur-mesure, moderne et efficace.
        </p>
        <div className={styles.ctaWrapper}>
          <a href="/contact" className={styles.ctaButton}>
            Contactez-moi
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
