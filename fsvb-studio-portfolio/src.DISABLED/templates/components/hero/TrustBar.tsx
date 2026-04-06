import React from 'react';
import styles from './TrustBar.module.css';
import type { TrustItem, StatItem } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface TrustBarProps {
  stats?: StatItem[];
  logos?: TrustItem[];
}

export const TrustBar: React.FC<TrustBarProps> = ({ stats, logos }) => {
  return (
    <section className={styles.trustBar}>
      <div className={styles.container}>
        {stats && stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div className={styles.stat}>
                  {stat.icon && <span className={styles.statIcon}>{stat.icon}</span>}
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
                {index < stats.length - 1 && <div className={styles.separator} />}
              </React.Fragment>
            ))}
          </div>
        )}
        
        {logos && logos.length > 0 && (
          <div className={styles.logos}>
            {logos.map((logo, index) => (
              <img 
                key={index}
                src={logo.logo}
                alt={logo.alt || logo.name}
                className={styles.logo}
                title={logo.name}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};