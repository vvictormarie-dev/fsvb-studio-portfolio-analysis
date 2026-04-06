import React, { useState } from 'react';
import { Button } from './Button';

interface FormData {
  // Infos de base
  companyName: string;
  tagline: string;
  ctaLabel: string;
  email: string;
  phone: string;
  logoUrl: string;
  heroImageUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // Thème et couleurs
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: string;
  
  // Sections personnalisées
  aboutDescription: string;
  aboutValues: string; // JSON des valeurs clés
  servicesDescription: string;
  servicesItems: string; // JSON des services
  portfolioDescription: string;
  portfolioItems: string; // JSON des réalisations
  testimonialsItems: string; // JSON des témoignages
  faqItems: string; // JSON des FAQ
  contactAddress: string;
  processSteps: string; // JSON des étapes
  featuresItems: string; // JSON des avantages
}

interface ConfigurationCaptureModalSimpleProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { selectedTemplate: string; formData: FormData }) => void;
  initialTemplate?: string;
}

const ConfigurationCaptureModalSimple: React.FC<ConfigurationCaptureModalSimpleProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialTemplate = 'landing-solo'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTemplate] = useState(initialTemplate);

  const [formData, setFormData] = useState<FormData>({
    // Infos de base
    companyName: '',
    tagline: '',
    ctaLabel: 'Découvrir',
    email: '',
    phone: '',
    logoUrl: '',
    heroImageUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    
    // Thème et couleurs
    primaryColor: '#2563EB',
    secondaryColor: '#1E40AF',
    accentColor: '#FBBF24',
    backgroundColor: '#04040E',
    textColor: '#FFFFFF',
    theme: 'empire',
    
    // Sections personnalisées
    aboutDescription: '',
    aboutValues: JSON.stringify([
      { icon: '🎯', title: 'Expertise', description: 'Une compétence reconnue' },
      { icon: '❤️', title: 'Passion', description: 'Un engagement total' },
      { icon: '🎆', title: 'Résultats', description: 'Des résultats concrets' }
    ]),
    servicesDescription: '',
    servicesItems: JSON.stringify([
      { title: 'Service 1', description: 'Description du service', price: '99€' },
      { title: 'Service 2', description: 'Description du service', price: '149€' },
      { title: 'Service 3', description: 'Description du service', price: '199€' }
    ]),
    portfolioDescription: '',
    portfolioItems: JSON.stringify([
      { title: 'Projet 1', description: 'Description du projet', image: '', url: '' },
      { title: 'Projet 2', description: 'Description du projet', image: '', url: '' },
      { title: 'Projet 3', description: 'Description du projet', image: '', url: '' }
    ]),
    testimonialsItems: JSON.stringify([
      { name: 'Client 1', role: 'Entrepreneur', text: 'Excellent service, je recommande !', rating: 5 },
      { name: 'Client 2', role: 'Directeur', text: 'Très professionnel et efficace', rating: 5 }
    ]),
    faqItems: JSON.stringify([
      { question: 'Comment ça marche ?', answer: 'C\'est très simple...' },
      { question: 'Combien ça coûte ?', answer: 'Nos tarifs commencent à...' },
      { question: 'Quels sont les délais ?', answer: 'Généralement sous 5 jours...' }
    ]),
    contactAddress: '',
    processSteps: JSON.stringify([
      { icon: '📞', title: 'Étape 1', description: 'Premier contact' },
      { icon: '📝', title: 'Étape 2', description: 'Analyse de vos besoins' },
      { icon: '🎨', title: 'Étape 3', description: 'Création sur-mesure' }
    ]),
    featuresItems: JSON.stringify([
      { icon: '✅', title: 'Avantage 1', description: 'Description de l\'avantage' },
      { icon: '🚀', title: 'Avantage 2', description: 'Description de l\'avantage' },
      { icon: '🏆', title: 'Avantage 3', description: 'Description de l\'avantage' }
    ])
  });


  // Slides simples pour l'ancien modal
  const slides = [
    {
      title: 'Informations de base',
      subtitle: 'Informations essentielles pour personnaliser le site',
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
    },
    {
      title: 'Finalisation',
      subtitle: 'Votre site va être configuré avec le contenu par défaut',
      content: (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ 
            padding: '1.5rem', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Configuration simple terminée !
            </h3>
            <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem' }}>
              Votre site va être configuré automatiquement avec du contenu d'exemple.
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>🎯 Récapitulatif</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-primary)' }}>
              <li>Template : {selectedTemplate}</li>
              <li>Entreprise : {formData.companyName || 'Non renseigné'}</li>
              <li>Email : {formData.email || 'Non renseigné'}</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const canProceed = () => {
    if (currentSlide === 0) {
      return formData.companyName.trim() !== '' && formData.email.trim() !== '';
    }
    return true;
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
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
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                {slides[currentSlide]?.title || 'Configuration'}
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {slides[currentSlide]?.subtitle || 'Configuration en cours'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <div style={{
              flex: 1,
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold-primary), var(--gold-secondary))',
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '2rem',
          maxHeight: 'calc(90vh - 180px)',
          overflowY: 'auto'
        }}>
          {slides[currentSlide]?.content || <div>Chargement...</div>}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <Button
            onClick={handlePrev}
            disabled={isFirstSlide}
            variant="secondary"
          >
            ← Précédent
          </Button>

          <Button
            onClick={isLastSlide ? handleComplete : handleNext}
            disabled={!canProceed()}
            variant="primary"
          >
            {isLastSlide ? '🚀 Créer mon site' : 'Suivant →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCaptureModalSimple;