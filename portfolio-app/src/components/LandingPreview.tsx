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
  
  // 🎨 Système de dégradés conditionnels
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  
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
  onEditSection?: (sectionId: string) => void;
}

const LandingPreview: React.FC<LandingPreviewProps> = ({
  selectedTemplate,
  formData,
  colorMode,
  sectionsConfig,
  restaurantSectionsConfig,
  coachSectionsConfig,
  theme,
  className,
  onEditSection
}) => {
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

  // DEBUG: Vérifier que les couleurs sont bien reçues depuis le système de sections
  const debugThemeProps = getSectionProps('theme');
  console.log('🎨 LandingPreview - Couleurs reçues depuis sections:', {
    primary: debugThemeProps?.primaryColor,
    secondary: debugThemeProps?.secondaryColor,
    accent: debugThemeProps?.accentColor,
    background: debugThemeProps?.backgroundColor,
    text: debugThemeProps?.textColor,
    colorMode: colorMode
  });

  // INJECTION CSS DYNAMIQUE POUR LES COULEURS
  const generateCustomCSS = () => {
    const themeProps = getSectionProps('theme');
    
    // En mode custom, utiliser les couleurs personnalisées
    if (colorMode === 'custom') {
      const titleColor = themeProps?.primaryColor || '#2563EB';
      const buttonColor = themeProps?.secondaryColor || '#1E40AF';
      const linkColor = themeProps?.accentColor || '#FBBF24';
      const bgColor = themeProps?.backgroundColor || '#04040E';
      const textColor = themeProps?.textColor || '#FFFFFF';
      const gradientStart = themeProps?.gradientStart || '#1a2337';
      const gradientEnd = themeProps?.gradientEnd || '#ae501e';

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

      const buttonLuminance = getLuminance(buttonColor);
      const buttonTextColor = buttonLuminance > 0.5 ? '#000000' : '#FFFFFF';

      return `
        /* 🛡️ PROTECTION CONTRE L'AUTO-DÉTECTION NAVIGATEUR */
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] {
          color-scheme: none !important;
          forced-color-adjust: none !important;
        }
        
        /* 🎯 COULEURS PERSONNALISÉES */
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] {
          --template-primary: ${titleColor} !important;
          --template-secondary: ${buttonColor} !important;
          --template-accent: ${titleColor} !important;
          --template-accent-hover: ${titleColor} !important;
          --template-accent-tertiary: ${linkColor} !important;
          --template-bg-start: ${bgColor} !important;
          --template-bg-middle: ${bgColor} !important;
          --template-bg-end: ${bgColor} !important;
          --template-text-primary: ${textColor} !important;
          --template-text-secondary: ${textColor}99 !important;
          --template-border: ${titleColor}33 !important;
          --template-card-bg: ${titleColor}11 !important;
          --template-button-text: ${buttonTextColor} !important;
          
          ${formData.gradientEnabled ? `
          --template-gradient-start: ${gradientStart} !important;
          --template-gradient-end: ${gradientEnd} !important;
          ` : ''}
        }
        
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] .template-button, 
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] button:not([class*="ConfiguratorPage"]) { 
          background: ${buttonColor} !important; 
          color: ${buttonTextColor} !important; 
        }
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] h1,
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] h2,
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] h3 { 
          color: ${titleColor} !important; 
        }
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] a:not([class*="ConfiguratorPage"]),
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] .template-link { 
          color: ${linkColor} !important; 
        }
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] p,
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] span:not([class*="ConfiguratorPage"]) { 
          color: ${textColor} !important; 
        }
        
        ${themeProps?.gradientEnabled ? `
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] .template-gradient-bg,
        .landing-preview-container[data-theme="${theme || formData.theme || 'empire'}"] .cta-box {
          background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd}) !important;
        }
        ` : ''}
      `;
    }
    
    // En mode auto, forcer l'application du thème choisi
    const selectedTheme = themeProps?.themeName || theme || formData.theme || 'empire';
    return `
      /* 🎨 THÈME AUTOMATIQUE FORCÉ: ${selectedTheme} */
      .landing-preview-container {
        transition: all 0.3s ease;
      }
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
          onEditSection={onEditSection}
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
          onEditSection={onEditSection}
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
          onEditSection={onEditSection}
        />;
      default:
        return <LandingSolo {...templateProps} />;
    }
  };

  // ✅ FORCER LA RÉAPPLICATION DU THÈME
  const currentTheme = getSectionProps('theme')?.themeName || theme || formData.theme || 'empire';
  
  return (
    <div 
      data-theme={currentTheme}
      className={`landing-preview-container ${className || ''}`}
      key={`${selectedTemplate}-${currentTheme}`} // Force re-render on theme change
    >
      <style>{generateCustomCSS()}</style>
      <TemplateComponent />
    </div>
  );
};

export default LandingPreview;