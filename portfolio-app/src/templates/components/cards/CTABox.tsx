import React from 'react';
import styles from './CTABox.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface CTABoxProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
    href?: string;
  };
  backgroundImage?: string;
  variant?: 'default' | 'gradient' | 'minimal' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

export const CTABox: React.FC<CTABoxProps> = ({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton,
  backgroundImage,
  variant = 'default',
  size = 'medium'
}) => {
  const handleButtonClick = (button: { onClick: () => void; href?: string }) => {
    if (button.href) {
      window.open(button.href, '_blank');
    }
    button.onClick();
  };

  return (
    <div 
      className={`${styles.cta} ${styles[variant]} ${styles[size]}`}
      style={backgroundImage ? { 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})` 
      } : undefined}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.buttons}>
          <button 
            className={`${styles.button} ${styles.primary}`}
            onClick={() => handleButtonClick(primaryButton)}
          >
            {primaryButton.text}
            <span className={styles.arrow}>→</span>
          </button>
          
          {secondaryButton && (
            <button 
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => handleButtonClick(secondaryButton)}
            >
              {secondaryButton.text}
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.decoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
};