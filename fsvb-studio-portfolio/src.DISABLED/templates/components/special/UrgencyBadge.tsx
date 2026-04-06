import React from 'react';
import styles from './UrgencyBadge.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface UrgencyBadgeProps {
  text: string;
  count?: number;
  variant?: 'warning' | 'error' | 'success';
  animated?: boolean;
  icon?: string;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({
  text,
  count,
  variant = 'warning',
  animated = true,
  icon
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'error': return '🚨';
      case 'success': return '✅';
      case 'warning': 
      default: return '⚡';
    }
  };

  const displayIcon = icon || getDefaultIcon();
  const displayText = count !== undefined ? `${text} ${count}` : text;

  return (
    <span className={`${styles.badge} ${styles[variant]} ${animated ? styles.animated : ''}`}>
      <span className={styles.icon}>{displayIcon}</span>
      <span className={styles.text}>{displayText}</span>
    </span>
  );
};