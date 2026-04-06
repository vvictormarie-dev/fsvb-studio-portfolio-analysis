import React from 'react';
import styles from './ComparisonBox.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ComparisonBoxProps {
  title: string;
  beforeTitle?: string;
  beforeItems: string[];
  afterTitle?: string;
  afterItems: string[];
  variant?: 'default' | 'emphasis';
}

export const ComparisonBox: React.FC<ComparisonBoxProps> = ({
  title,
  beforeTitle = 'Sans moi',
  beforeItems,
  afterTitle = 'Avec moi',
  afterItems,
  variant = 'default'
}) => {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.comparison}>
        <div className={styles.beforeColumn}>
          <h4 className={styles.columnTitle}>{beforeTitle}</h4>
          <ul className={styles.itemsList}>
            {beforeItems.map((item, index) => (
              <li key={index} className={styles.beforeItem}>
                <span className={styles.beforeIcon}>❌</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.separator}></div>
        
        <div className={styles.afterColumn}>
          <h4 className={styles.columnTitle}>{afterTitle}</h4>
          <ul className={styles.itemsList}>
            {afterItems.map((item, index) => (
              <li key={index} className={styles.afterItem}>
                <span className={styles.afterIcon}>✅</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};