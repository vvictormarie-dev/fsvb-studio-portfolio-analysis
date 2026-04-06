import React from 'react';
import styles from './StatCard.module.css';
import type { Stat } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface StatCardProps {
  stat: Stat;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index = 0 }) => {
  const formatValue = (value: string | number, suffix?: string) => {
    if (typeof value === 'string') return value;
    
    // Handle large numbers with abbreviations
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${suffix || ''}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${suffix || ''}`;
    }
    return `${value}${suffix || ''}`;
  };

  return (
    <div 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {stat.icon && (
        <div className={styles.icon}>
          {typeof stat.icon === 'string' ? (
            <span>{stat.icon}</span>
          ) : (
            stat.icon
          )}
        </div>
      )}
      
      <div className={styles.content}>
        <div className={styles.value}>
          {formatValue(stat.value, stat.suffix)}
          {stat.prefix && <span className={styles.prefix}>{stat.prefix}</span>}
        </div>
        
        <div className={styles.label}>{stat.label}</div>
        
        {stat.description && (
          <div className={styles.description}>{stat.description}</div>
        )}
        
        {stat.change && (
          <div className={`${styles.change} ${
            stat.change.startsWith('+') ? styles.positive : 
            stat.change.startsWith('-') ? styles.negative : 
            styles.neutral
          }`}>
            {stat.change}
          </div>
        )}
      </div>
    </div>
  );
};