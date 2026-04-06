import React from 'react';
import sectionStyles from '../styles/sectionStyles.module.css';
import styles from './Templates.module.css';
import TemplateSection from './TemplateSection';

const TemplatesPage: React.FC = () => {
  return (
    <>
      {/* 1. Section d’intro */}
      <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.introSection}>
        <h1 className={styles.title}>Templates prêts à l’emploi</h1>
        <p className={styles.text}>Découvrez une sélection de templates premium, pensés pour les entrepreneurs, créatifs et indépendants.</p>
        <a href="/contact" className={styles.ctaButton}>Commander un site</a>
      </section>

      {/* 2. Grille de templates */}
      <section className={sectionStyles.sectionGold + ' ' + styles.gridSection}>
        <TemplateSection />
      </section>

      {/* 3. Section CTA finale */}
      <section className={sectionStyles.sectionDark + ' ' + styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Prêt à propulser votre présence en ligne ?</h2>
        <a href="/contact" className={styles.ctaButtonDark}>Commander un site</a>
      </section>
    </>
  );
};

export default TemplatesPage;
