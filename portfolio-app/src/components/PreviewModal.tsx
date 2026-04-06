import React, { useState } from 'react';
import LandingPreview from './LandingPreview';
import { Button } from './Button';
import styles from './PreviewModal.module.css';

interface FormData {
  companyName: string;
  tagline: string;
  ctaLabel: string;
  email: string;
  phone: string;
  logoUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  
  // 🎨 Système de dégradés conditionnels
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  
  theme: string;
}

interface PreviewConfig {
  selectedTemplate: 'landing-solo' | 'restaurant' | 'coach';
  formData: FormData;
  sectionsConfig: any[];
  restaurantSectionsConfig?: any[];
  coachSectionsConfig?: any[];
  theme: string;
}

interface PreviewModalProps {
  isOpen: boolean;
  config: PreviewConfig;
  onClose: () => void;
  onValidate: () => Promise<void>;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  config,
  onClose,
  onValidate
}) => {
  const [isValidating, setIsValidating] = useState(false);

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      await onValidate();
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    } finally {
      setIsValidating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Corps du modal avec scroll */}
        <div className={styles.body}>
          <LandingPreview
            selectedTemplate={config.selectedTemplate}
            formData={config.formData}
            sectionsConfig={config.sectionsConfig}
            restaurantSectionsConfig={config.restaurantSectionsConfig || []}
            coachSectionsConfig={config.coachSectionsConfig || []}
            theme={config.theme}
            className={styles.preview}
          />
        </div>

        {/* Bandeau fixe en bas */}
        <div className={styles.bottomBar}>
          <Button
            variant="secondary"
            onClick={onClose}
            className={styles.closeButton}
          >
            ✕ Fermer
          </Button>
          
          <div className={styles.bottomActions}>
            <Button
              variant="secondary"
              onClick={onClose}
              className={styles.modifyButton}
            >
              ✏️ Modifier
            </Button>
            
            <Button
              variant="primary"
              onClick={handleValidate}
              disabled={isValidating}
              className={styles.validateButton}
            >
              {isValidating ? '🔄 Validation...' : '✅ Valider cette commande'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;