import React from 'react';
import styles from './ServicesGrid.module.css';
import { ServiceCard } from '../cards/ServiceCard';
import type { Service } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ServicesGridProps {
  title: string;
  subtitle?: string;
  services: Service[];
  onServiceSelect?: (service: Service) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  title,
  subtitle,
  services,
  onServiceSelect
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`${styles.serviceItem} ${index === 1 ? styles.recommended : ''}`}
            >
              <ServiceCard 
                service={service} 
                onSelect={onServiceSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};