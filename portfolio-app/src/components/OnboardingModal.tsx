import React from 'react';
import { Button } from './Button';
import styles from './OnboardingModal.module.css';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  onStart 
}) => {
  if (!isOpen) return null;

  const handleStart = () => {
    localStorage.setItem('hasSeenConfiguratorOnboarding', 'true');
    onStart();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenConfiguratorOnboarding', 'true');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleSkip}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Bienvenue dans votre configurateur !
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleSkip}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.icon}>🎨</div>
          
          <p className={styles.subtitle}>
            Créez votre site vitrine premium en quelques étapes
          </p>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>1️⃣</div>
              <div>
                <h3>Choisissez votre template</h3>
                <p>Sélectionnez le design adapté à votre activité</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepIcon}>2️⃣</div>
              <div>
                <h3>Personnalisez votre contenu</h3>
                <p>Textes, couleurs, sections selon vos besoins</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepIcon}>3️⃣</div>
              <div>
                <h3>Commandez et recevez</h3>
                <p>Paiement sécurisé, livraison en 5 jours maximum</p>
              </div>
            </div>
          </div>
          
          <div className={styles.features}>
            <div className={styles.feature}>✅ Preview en temps réel</div>
            <div className={styles.feature}>✅ Tooltips d'aide contextuelle</div>
            <div className={styles.feature}>✅ Sauvegarde automatique</div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Button 
            variant="ghost" 
            onClick={handleSkip}
          >
            Passer l'intro
          </Button>
          <Button 
            variant="primary" 
            onClick={handleStart}
          >
            Commencer la personnalisation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;