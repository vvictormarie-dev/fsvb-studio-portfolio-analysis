import React from 'react';
import { Button } from './Button';
import styles from './ConfigurationModal.module.css';

interface Slide {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface ConfigurationModalProps {
  slides: Slide[];
  currentSlide: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({
  slides,
  currentSlide,
  onNext,
  onPrev,
  onClose,
  isFirstSlide,
  isLastSlide
}) => {
  const currentSlideData = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header avec progression */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{currentSlideData.title}</h2>
            <p className={styles.subtitle}>{currentSlideData.subtitle}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Barre de progression */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Étapes indicator */}
        <div className={styles.stepsIndicator}>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`${styles.step} ${index <= currentSlide ? styles.stepActive : ''}`}
            >
              {index < currentSlide ? '✓' : index + 1}
            </div>
          ))}
        </div>

        {/* Contenu du slide */}
        <div className={styles.content}>
          {currentSlideData.content}
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={isFirstSlide}
          >
            ← Précédent
          </Button>
          
          <div className={styles.slideCounter}>
            {currentSlide + 1} / {slides.length}
          </div>

          <Button
            variant="primary" 
            onClick={isLastSlide ? onClose : onNext}
          >
            {isLastSlide ? 'Terminer' : 'Suivant →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationModal;