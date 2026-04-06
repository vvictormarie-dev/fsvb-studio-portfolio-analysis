import React from 'react';
import styles from './AboutSection.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

interface AboutSectionProps {
  title: string;
  description: string;
  image: string;
  values: AboutValue[];
  ctaText?: string;
  ctaLink?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  image,
  values,
  ctaText,
  ctaLink
}) => {
  const handleCTAClick = () => {
    if (ctaLink) {
      window.open(ctaLink, '_blank');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img 
                src={image} 
                alt={title}
                className={styles.profileImage}
              />
            </div>
          </div>
          
          <div className={styles.textColumn}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            
            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    {value.icon}
                  </div>
                  <div className={styles.valueContent}>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDescription}>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {ctaText && (
              <button 
                className={styles.ctaButton}
                onClick={handleCTAClick}
              >
                {ctaText}
                <span className={styles.arrow}>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};