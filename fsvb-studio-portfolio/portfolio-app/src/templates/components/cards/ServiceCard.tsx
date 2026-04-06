import React from 'react';
import styles from './ServiceCard.module.css';
import type { Service } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const handleSelect = () => {
    onSelect?.(service);
  };

  return (
    <div 
      className={styles.card}
      onClick={handleSelect}
    >
      
      <div className={styles.icon}>
        {typeof service.icon === 'string' ? (
          <span>{service.icon}</span>
        ) : (
          service.icon
        )}
      </div>
      
      <div className={styles.header}>
        <h3 className={styles.name}>{service.title}</h3>
        {service.price && <div className={styles.price}>{service.price}</div>}
      </div>
      
      <p className={styles.description}>{service.description}</p>
      
      {service.features && (
        <ul className={styles.features}>
          {service.features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      <button className={styles.selectButton} onClick={handleSelect}>
        Choisir ce service
      </button>
    </div>
  );
};