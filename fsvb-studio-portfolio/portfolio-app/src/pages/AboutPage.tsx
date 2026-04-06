import React from 'react';
import { Button } from '../components/Button';
import sectionStyles from '../styles/sectionStyles.module.css';
import styles from './AboutPage.module.css';

const softSkills = [
  'Écoute & empathie',
  'Créativité',
  'Rigueur technique',
  'Esprit d’équipe',
  'Adaptabilité',
];

const AboutPage: React.FC = () => {
  return (
    <>
      {/* 1. Intro avec photo, nom, texte */}
      <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.introSection}>
        <div className="wrapper">
          <div className={styles.introContent}>
            <img src="/images/FSVB_Studio.webp" alt="FSVB Studio" className={styles.portrait} />
            <div className={styles.introText}>
              <h1 className={`${styles.name} pageTitle`}>FSVB Studio</h1>
              <p className={styles.description}>
                FSVB Studio accompagne les entrepreneurs et créatifs dans la création de solutions digitales modernes, élégantes et performantes. Notre approche allie expertise technique, optimisation IA et écoute pour des expériences sur-mesure livrées en 5 jours maximum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Valeurs, expertise, soft skills */}
      <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.skillsSection}>
        <div className="wrapper">
          <h2 className={styles.skillsTitle}>Valeurs & Soft Skills</h2>
          <ul className={styles.skillsList}>
            {softSkills.map((skill, idx) => (
              <li key={idx} className={styles.skillItem}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Pourquoi me faire confiance ? */}
      <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.trustSection}>
        <div className="wrapper">
          <h2 className={styles.trustTitle}>Pourquoi me faire confiance ?</h2>
          <p className={styles.trustText}>
            +10 ans d'expérience, des dizaines de projets menés avec succès, une approche humaine et personnalisée. Je mets tout en œuvre pour garantir la réussite de votre projet, avec transparence et engagement.
          </p>
        </div>
      </section>

      {/* 4. CTA vers Contact */}
      <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.ctaSection}>
        <div className="wrapper">
          <h2 className={styles.ctaTitle}>Prêt à collaborer ?</h2>
          <Button variant="primary" size="large" href="/configurator">
            Commander votre site
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
