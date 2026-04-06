import React from 'react';
import styles from './Section.module.css';
import type { SectionProps } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  theme
}) => {
  return (
    <section 
      id={id} 
      className={`${styles.section} ${className}`}
      data-theme={theme}
      data-section={id}  // Attribut pour auto-scroll spécifique
    >
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
};