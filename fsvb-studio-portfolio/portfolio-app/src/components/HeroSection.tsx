import React from 'react';
import { Button } from './Button';
import styles from './HeroSection.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={`${styles.hero} ${sectionStyles.sectionDark}`}> 
      <div className="wrapper">
        <div className={styles.heroContent}>
          <div className={styles.content}>
            <h1 className={styles.title}>Sites vitrines premium</h1>
            <p className={styles.subtitle}>
              Spécialiste sites Coach et Restaurant - Optimisés par IA<br/>
              Solutions digitales sur-mesure pour entrepreneurs ambitieux.
            </p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button variant="primary" size="large" href="/configurator">
            Commander un site
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
