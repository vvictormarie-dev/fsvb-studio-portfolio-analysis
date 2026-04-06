import React from 'react';
import styles from './GuaranteeBox.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface Guarantee {
  icon: string;
  text: string;
}

interface GuaranteeBoxProps {
  title: string;
  guarantees: Guarantee[];
  ctaText?: string;
  ctaLink?: string;
}

export const GuaranteeBox: React.FC<GuaranteeBoxProps> = ({
  title,
  guarantees,
  ctaText,
  ctaLink
}) => {
  const handleCTAClick = () => {
    if (ctaLink) {
      window.open(ctaLink, '_blank');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.guaranteeGrid}>
        {guarantees.map((guarantee, index) => (
          <div key={index} className={styles.guaranteeItem}>
            <div className={styles.guaranteeIcon}>
              {guarantee.icon}
            </div>
            <p className={styles.guaranteeText}>
              {guarantee.text}
            </p>
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
  );
};