import React from 'react';
import styles from './HeroSection.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface CTAButton {
  text: string;
  href: string;
  onClick?: () => void;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  image?: string;
  backgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  backgroundImage
}) => {
  // ✅ Calcul automatique de la classe CSS selon la longueur du titre
  const getTitleSizeClass = (title: string) => {
    if (title.length > 25) return styles.titleSmall;
    if (title.length > 20) return styles.titleMedium;
    return styles.titleLarge;
  };

  const handleCTAClick = (cta: CTAButton, e: React.MouseEvent) => {
    if (cta.onClick) {
      e.preventDefault();
      cta.onClick();
    }
  };

  return (
    <section 
      className={styles.hero}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundImage && <div className={styles.overlay} />}
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={`${styles.title} ${getTitleSizeClass(title)}`}>{title}</h1>
            <h2 className={styles.subtitle}>{subtitle}</h2>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
            
            <div className={styles.actions}>
              <a 
                href={primaryCTA.href}
                className={`${styles.cta} ${styles.primary}`}
                onClick={(e) => handleCTAClick(primaryCTA, e)}
              >
                {primaryCTA.text}
              </a>
              
              {secondaryCTA && (
                <a 
                  href={secondaryCTA.href}
                  className={`${styles.cta} ${styles.secondary}`}
                  onClick={(e) => handleCTAClick(secondaryCTA, e)}
                >
                  {secondaryCTA.text}
                </a>
              )}
            </div>
          </div>
          
          {image && (
            <div className={styles.imageContent}>
              <img src={image} alt={title} className={styles.heroImage} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};