import React, { useState } from 'react';
import styles from './TemplateCardNew.module.css';
import { Button } from './Button';
import { TemplateModal } from './TemplateModal';
import { LandingSolo } from '../templates/landing-solo/LandingSolo';
import { Restaurant } from '../templates/restaurant/Restaurant';
import { Coach } from '../templates/coach/Coach';


interface TemplateCardProps {
  name: string;
  description: string;
  screenshot: string;
  demoUrl: string;
  price: string;
  deliveryTime: string;
  features: string[];
  templateKey?: 'landing-solo' | 'restaurant' | 'coach';
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  description,
  screenshot,
  price,
  deliveryTime,
  features,
  templateKey
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Obtenir le composant template correspondant
  const getTemplateComponent = () => {
    switch (templateKey) {
      case 'landing-solo':
        return <LandingSolo />;
      case 'restaurant':
        return <Restaurant />;
      case 'coach':
        return <Coach />;
      default:
        return <div style={{ padding: '2rem', color: 'white' }}>Template non disponible</div>;
    }
  };
  return (
    <div className={`glassCard glassCardBordered glassCardInteractive ${styles.card}`}>
      <div className={styles.screenshot} onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }}>
        <img src={screenshot} alt={name} />
        <div className={styles.demoOverlay}>
          <span>📺 Voir la démo</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.price}>{price}</div>
        </div>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.meta}>
          <span className={styles.delivery}>⚡ {deliveryTime}</span>
        </div>
        
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              ✓ {feature}
            </li>
          ))}
        </ul>
        
        <div className={styles.actions}>
          <Button 
            variant="primary" 
            href={`/configurator?template=${templateKey || 'landing-solo'}`}
          >
            Créer ce site
          </Button>
        </div>
      </div>

      {/* Modal pour afficher le template */}
      <TemplateModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
      >
        {getTemplateComponent()}
      </TemplateModal>
    </div>
  );
};