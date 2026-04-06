import React from 'react';
import styles from './AboutSection.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

const AboutSection: React.FC = () => {
  return (
    <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.aboutSection}>
      <div className="wrapper">
        <div className={styles.centeredContent}>
          <h2 className={styles.title}>À propos de moi</h2>
          <p className={styles.text}>
            Passionné par le web et le design, j'accompagne les entrepreneurs et créatifs dans la création de sites modernes, élégants et performants. Mon approche allie expertise technique, sens du détail et écoute pour des expériences sur-mesure.
          </p>
          <a href="#contact" className={sectionStyles.ctaButton}>Me contacter</a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
