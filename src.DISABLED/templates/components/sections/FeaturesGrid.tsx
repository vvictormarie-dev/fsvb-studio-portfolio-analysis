import React from 'react';
import styles from './FeaturesGrid.module.css';
import { FeatureCard } from '../cards/FeatureCard';
import type { Feature } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface FeaturesGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 3 | 4;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  title,
  subtitle,
  features,
  columns = 3
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={`${styles.grid} ${styles[`columns${columns}`]}`}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureItem}>
              <FeatureCard 
                feature={feature}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};