import React, { useState } from 'react';
import { Button } from './Button';

interface FormData {
  companyName: string;
  tagline: string;
  email: string;
  theme: string;
}

interface ConfigurationCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { selectedTemplate: string; formData: FormData }) => void;
  initialTemplate?: string;
}

const ConfigurationCaptureModal: React.FC<ConfigurationCaptureModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialTemplate = 'landing-solo'
}) => {
  const [selectedTemplate] = useState(initialTemplate);

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    tagline: '',
    email: '',
    theme: 'empire'
  });

  // Slides simples
  const slides = [
    {
      title: 'Configuration rapide',
      subtitle: 'Juste les informations essentielles',
      content: (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              placeholder="Ex: Mon Entreprise"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="contact@monentreprise.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    return formData.companyName.trim() !== '' && formData.email.trim() !== '';
  };

  const handleComplete = () => {
    onComplete({
      selectedTemplate,
      formData
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--background-elevated)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
            {slides[0].title}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {slides[0].subtitle}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          {slides[0].content}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!canProceed()}
            variant="primary"
          >
            🚀 Créer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCaptureModal;