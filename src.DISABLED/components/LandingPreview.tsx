import React from 'react';
import { LandingSolo } from '../templates/landing-solo/LandingSolo';
import { Restaurant } from '../templates/restaurant/Restaurant';
import { Coach } from '../templates/coach/Coach';
import { getSectionDefaults } from '../config/sectionPropsMapping';
import { type LandingSectionConfig } from '../templates/landing-solo/LandingSolo.sections';
import { type RestaurantSectionConfig } from '../templates/restaurant/Restaurant.sections';
import { type CoachSectionConfig } from '../templates/coach/Coach.sections';

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
  theme: string;
}

interface LandingPreviewProps {
  selectedTemplate: 'landing-solo' | 'restaurant' | 'coach';
  formData: FormData;
  colorMode?: 'auto' | 'custom';
  sectionsConfig: LandingSectionConfig[];
  restaurantSectionsConfig: RestaurantSectionConfig[];
  coachSectionsConfig: CoachSectionConfig[];
  theme?: string;
  className?: string;
}

const LandingPreview: React.FC<LandingPreviewProps> = ({
  selectedTemplate,
  formData,
  colorMode,
  sectionsConfig,
  restaurantSectionsConfig,
  coachSectionsConfig,
  theme,
  className
}) => {
  // DEBUG: Vérifier que les couleurs sont bien reçues
  console.log('🎨 LandingPreview - Couleurs reçues:', {
    colorMode,
    primary: formData.primaryColor,
    secondary: formData.secondaryColor,
    accent: formData.accentColor,
    background: formData.backgroundColor,
    text: formData.textColor,
    willApplyCustomColors: colorMode === 'custom'
  });

  const templateProps = {
    hideThemeSelector: true,
  };

  // Helper pour récupérer les props d'une section spécifique avec fallbacks
  const getSectionProps = (sectionId: string) => {
    let section;
    if (selectedTemplate === 'landing-solo') {
      section = sectionsConfig.find(s => s.id === sectionId);
    } else if (selectedTemplate === 'restaurant') {
      section = restaurantSectionsConfig.find(s => s.id === sectionId);
    } else if (selectedTemplate === 'coach') {
      section = coachSectionsConfig.find(s => s.id === sectionId);
    } else {
      section = sectionsConfig.find(s => s.id === sectionId);
    }
    
    // Récupérer les valeurs par défaut pour cette section
    const defaults = getSectionDefaults(selectedTemplate, sectionId);
    
    // Merger les props avec les defaults (props override defaults)
    return { ...defaults, ...(section?.props || {}) };
  };

  // INJECTION CSS DYNAMIQUE POUR LES COULEURS PERSONNALISÉES
  const generateCustomCSS = () => {
    // SEULEMENT si mode custom !
    if (colorMode !== 'custom') return '';
    
    const primary = formData.primaryColor || '#2563EB';
    const secondary = formData.secondaryColor || '#1E40AF';
    const accent = formData.accentColor || '#FBBF24';
    const background = formData.backgroundColor || '#04040E';
    const text = formData.textColor || '#FFFFFF';

    // Calculer la luminosité pour choisir la couleur de texte optimale
    const getLuminance = (hex: string): number => {
      const rgb = hex.replace('#', '').match(/.{2}/g);
      if (!rgb) return 0;
      const [r, g, b] = rgb.map(x => {
        const val = parseInt(x, 16) / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const primaryLuminance = getLuminance(primary);
    const buttonTextColor = primaryLuminance > 0.5 ? '#000000' : '#FFFFFF';

    return `
      :root {
        --template-accent: ${primary} !important;
        --template-accent-alt: ${secondary} !important;
        --template-accent-tertiary: ${accent} !important;
        --template-bg: ${background} !important;
        --template-text: ${text} !important;
        --template-text-muted: ${text}99 !important;
        --template-border: ${primary}33 !important;
        --template-card-bg: ${primary}11 !important;
        --template-button-text: ${buttonTextColor} !important;
      }
      
      [data-theme] .template-accent { color: ${primary} !important; }
      [data-theme] .template-bg { background: ${background} !important; }
      [data-theme] .template-text { color: ${text} !important; }
    `;
  };

  // Récupérer les props des sections navbar et footer
  const navbarProps = getSectionProps('navbar');
  const footerProps = getSectionProps('footer');
  
  const TemplateComponent = () => {
    switch(selectedTemplate) {
      case 'landing-solo':
        return <LandingSolo 
          {...templateProps}
          sectionsConfig={sectionsConfig}
          heroTitleOverride={formData.companyName || undefined}
          heroSubtitleOverride={formData.tagline || undefined}
          heroCtaLabelOverride={formData.ctaLabel || undefined}
          formData={formData}
          navbarProps={navbarProps}
          footerProps={footerProps}
        />;
      case 'restaurant':
        return <Restaurant 
          {...templateProps}
          sectionsConfig={restaurantSectionsConfig}
          heroTitleOverride={formData.companyName || undefined}
          heroSubtitleOverride={formData.tagline || undefined}
          formData={formData}
          navbarProps={navbarProps}
          footerProps={footerProps}
        />;
      case 'coach':
        return <Coach 
          {...templateProps}
          sectionsConfig={coachSectionsConfig}
          heroTitleOverride={formData.companyName || undefined}
          heroSubtitleOverride={formData.tagline || undefined}
          formData={formData}
          navbarProps={navbarProps}
          footerProps={footerProps}
        />;
      default:
        return <LandingSolo {...templateProps} />;
    }
  };
  
  return (
    <div 
      data-theme={theme || formData.theme || 'empire'} 
      className={className}
      style={colorMode === 'custom' ? {
        '--template-accent': formData.primaryColor || '#2563EB',
        '--template-accent-alt': formData.secondaryColor || '#1E40AF', 
        '--template-accent-tertiary': formData.accentColor || '#FBBF24',
        '--template-bg': formData.backgroundColor || '#04040E',
        '--template-text': formData.textColor || '#FFFFFF'
      } as React.CSSProperties : undefined}
    >
      <style>{generateCustomCSS()}</style>
      <TemplateComponent />
    </div>
  );
};

export default LandingPreview;