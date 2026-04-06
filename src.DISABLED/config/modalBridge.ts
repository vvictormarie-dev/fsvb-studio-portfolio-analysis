/*
=== PONT MODAL ↔ CONFIGURATEUR ===
Synchronisation temps réel : Modal formData → ConfiguratorPage formData → Preview
Résout les inputs bloqués du modal
*/

import type { FormData as ConfiguratorFormData } from '../pages/ConfiguratorPage';

// Interface pour les données du modal (structure JSON strings)
export interface ModalFormData {
  // Données de base
  companyName: string;
  email: string;
  phone: string;
  tagline: string;
  ctaLabel: string;
  logoUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // Sections avec données JSON
  servicesDescription: string;
  servicesItems: string;          // JSON: [{ title, description, price, features }]
  portfolioDescription: string;
  portfolioItems: string;         // JSON: [{ title, description, imageUrl, projectUrl }]
  featuresItems: string;          // JSON: [{ icon, title, description }]
  processSteps: string;           // JSON: [{ title, description, step }]
  testimonialsItems: string;      // JSON: [{ name, role, content, rating, avatarUrl }]
  faqItems: string;              // JSON: [{ question, answer }]
  aboutDescription: string;
  aboutValues: string;           // JSON: [{ icon, title, description }]
  contactAddress: string;
  contactCity: string;
  contactFormEmail: string;
  autoReplyMessage: string;
  useDifferentEmail: boolean;
}

// =====================================================================
// PARSER UTILITIES - Conversion JSON string → Objects
// =====================================================================

const safeJSONParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    if (!jsonString || jsonString.trim() === '') return defaultValue;
    const parsed = JSON.parse(jsonString);
    // Vérifier que le type correspond à ce qui est attendu
    if (Array.isArray(defaultValue)) {
      return Array.isArray(parsed) ? parsed as T : defaultValue;
    }
    return parsed as T || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Parser spécifiques pour chaque type de section
export const parseServices = (servicesItems: string) => 
  safeJSONParse(servicesItems, [
    { name: '', price: '', description: '', features: [], highlighted: false, ctaText: 'Commander' },
    { name: '', price: '', description: '', features: [], highlighted: false, ctaText: 'Commander' },
    { name: '', price: '', description: '', features: [], highlighted: false, ctaText: 'Commander' }
  ]);

export const parsePortfolio = (portfolioItems: string) =>
  safeJSONParse(portfolioItems, [
    { title: '', category: '', description: '', imageUrl: '', projectUrl: '' },
    { title: '', category: '', description: '', imageUrl: '', projectUrl: '' },
    { title: '', category: '', description: '', imageUrl: '', projectUrl: '' }
  ]);

export const parseFeatures = (featuresItems: string) =>
  safeJSONParse(featuresItems, [
    { title: '', description: '', icon: '⚡' },
    { title: '', description: '', icon: '🎨' },
    { title: '', description: '', icon: '📱' }
  ]);

export const parseTestimonials = (testimonialsItems: string) =>
  safeJSONParse(testimonialsItems, [
    { name: '', role: '', content: '', rating: 5, avatarUrl: '' },
    { name: '', role: '', content: '', rating: 5, avatarUrl: '' }
  ]);

export const parseFaq = (faqItems: string) =>
  safeJSONParse(faqItems, [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ]);

export const parseAboutValues = (aboutValues: string) =>
  safeJSONParse(aboutValues, [
    { icon: '⚡', title: 'Livraison Express', description: 'Votre site prêt en 3 jours maximum' },
    { icon: '🎨', title: 'Design Sur-Mesure', description: 'Création unique adaptée à votre image' },
    { icon: '📱', title: '100% Responsive', description: 'Parfait sur mobile, tablette et desktop' }
  ]);

// =====================================================================
// BRIDGE PRINCIPAL - TRANSFORMATION COMPLÈTE
// =====================================================================

export const bridgeModalToConfigurator = (modalData: ModalFormData): Partial<ConfiguratorFormData> => {
  const bridged = {
    // Champs simples (direct copy)
    companyName: modalData.companyName || '',
    email: modalData.email || '',
    phone: modalData.phone || '',
    tagline: modalData.tagline || '',
    ctaLabel: modalData.ctaLabel || '',
    logoUrl: modalData.logoUrl || '',
    instagramUrl: modalData.instagramUrl || '',
    linkedinUrl: modalData.linkedinUrl || '',
    
    // Services : JSON string → Object structure
    services: {
      sectionTitle: modalData.servicesDescription || 'Nos Services',
      sectionSubtitle: 'Des solutions adaptées à tous vos besoins',
      packages: parseServices(modalData.servicesItems)
    },
    
    // Portfolio : JSON string → Object structure  
    portfolio: {
      sectionTitle: modalData.portfolioDescription || 'Nos Réalisations',
      sectionSubtitle: 'Découvrez nos dernières créations',
      projects: parsePortfolio(modalData.portfolioItems)
    },
    
    // Features : JSON string → Object structure
    features: {
      sectionTitle: 'Pourquoi Nous Choisir',
      sectionSubtitle: 'Nos avantages concurrentiels',
      items: parseFeatures(modalData.featuresItems)
    },
    
    // Testimonials : JSON string → Object structure
    testimonials: {
      sectionTitle: 'Témoignages Clients',
      sectionSubtitle: 'Ce que disent nos clients',
      items: parseTestimonials(modalData.testimonialsItems)
    }
  };

  // Log pour debugging (à supprimer en production)
  console.log('🌉 Bridge Modal→Configurateur:', {
    input: {
      servicesItems: modalData.servicesItems?.length || 0,
      portfolioItems: modalData.portfolioItems?.length || 0,
      featuresItems: modalData.featuresItems?.length || 0
    },
    output: {
      services: bridged.services.packages.length,
      portfolio: bridged.portfolio.projects.length,
      features: bridged.features.items.length
    }
  });

  return bridged;
};

// =====================================================================
// HOOKS UTILITAIRES
// =====================================================================

export const shouldSyncSection = (modalData: ModalFormData, sectionType: string): boolean => {
  switch (sectionType) {
    case 'services':
      return !!(modalData.servicesItems && modalData.servicesItems.trim() !== '');
    case 'portfolio':
      return !!(modalData.portfolioItems && modalData.portfolioItems.trim() !== '');
    case 'features':
      return !!(modalData.featuresItems && modalData.featuresItems.trim() !== '');
    case 'testimonials':
      return !!(modalData.testimonialsItems && modalData.testimonialsItems.trim() !== '');
    case 'faq':
      return !!(modalData.faqItems && modalData.faqItems.trim() !== '');
    default:
      return false;
  }
};

export const getSectionChangeFields = (sectionType: string): string[] => {
  switch (sectionType) {
    case 'services':
      return ['servicesDescription', 'servicesItems'];
    case 'portfolio':
      return ['portfolioDescription', 'portfolioItems'];
    case 'features':
      return ['featuresItems'];
    case 'testimonials':
      return ['testimonialsItems'];
    case 'faq':
      return ['faqItems'];
    default:
      return [];
  }
};

// =====================================================================
// TYPES POUR TYPESCRIPT
// =====================================================================

export type SectionType = 'services' | 'portfolio' | 'features' | 'testimonials' | 'faq' | 'about';

export interface BridgeResult {
  success: boolean;
  sectionsUpdated: SectionType[];
  errors?: string[];
}

export default bridgeModalToConfigurator;