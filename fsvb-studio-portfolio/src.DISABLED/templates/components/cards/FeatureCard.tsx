import React from 'react';
import styles from './FeatureCard.module.css';
import type { Feature } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{feature.icon}</div>
      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.description}>{feature.description}</p>
    </div>
  );
};