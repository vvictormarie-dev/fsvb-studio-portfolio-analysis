import React from 'react';
import sectionStyles from '../styles/sectionStyles.module.css';
import styles from './AboutSectionPage.module.css';

const AboutSectionPage: React.FC = () => (
  <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.section}>
    <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Mon univers</h1>
      <p className={styles.text}>
        Je conçois des sites web sur-mesure, alliant design élégant et impact digital. Mon objectif est de créer une vitrine fidèle à l’âme de chaque projet.
      </p>
      <a href="/templates" className={styles.ctaButton}>Voir mes templates</a>
    </div>
  </section>
);

export default AboutSectionPage;
