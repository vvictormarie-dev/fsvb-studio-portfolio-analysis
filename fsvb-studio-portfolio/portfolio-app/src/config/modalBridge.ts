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
  
  // 🎯 HERO FIELDS - Nouveaux champs dédiés
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaButton: string;
  heroImage: string;
  
  // 👤 ABOUT FIELDS - Champs About complets
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  aboutValues: string;           // JSON: [{ icon, title, description }]
  
  // 🔄 PROCESS FIELDS - Champs Process complets
  processTitle: string;
  processSubtitle: string;
  processDescription: string;
  processSteps: string;          // JSON: [{ icon, title, description }] (4 étapes)
  
  // Sections avec données JSON
  servicesDescription: string;
  servicesItems: string;          // JSON: [{ title, description, price, features }]
  portfolioDescription: string;
  portfolioItems: string;         // JSON: [{ title, description, imageUrl, projectUrl }]
  featuresItems: string;          // JSON: [{ icon, title, description }]

  testimonialsItems: string;      // JSON: [{ name, role, content, rating, avatarUrl }]
  faqItems: string;              // JSON: [{ question, answer }]
  contactAddress: string;
  contactCity: string;
  contactFormEmail: string;
  autoReplyMessage: string;
  useDifferentEmail: boolean;
  
  // URLs externes pour Contact
  googleMapsUrl: string;
  calendarUrl: string;
  bookingUrl: string;
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
export const parseServices = (servicesItems: string) => {
  const parsed = safeJSONParse(servicesItems, [
    { title: '', price: '', description: '', features: [] },
    { title: '', price: '', description: '', features: [] },
    { title: '', price: '', description: '', features: [] }
  ]);
  
  // Mapper title → name pour compatibilité configurateur
  return parsed.map((service: any) => ({
    name: service.title || service.name || '',  // title du modal → name configurateur
    price: service.price || '',
    description: service.description || '',
    features: service.features || [],
    highlighted: service.highlighted || false,
    ctaText: service.ctaText || 'Commander'
  }));
};

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

export const parseFaq = (faqItems: string) => {
  const parsed = safeJSONParse(faqItems, [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ]);
  
  // Ajouter des IDs uniques pour chaque FAQ
  return parsed.map((faq, index) => ({
    id: `faq-${index + 1}`,
    question: faq.question || '',
    answer: faq.answer || ''
  }));
};

export const parseAboutValues = (aboutValues: string) =>
  safeJSONParse(aboutValues, [
    { icon: '⚡', title: 'Livraison Express', description: 'Votre site prêt en 3 jours maximum' },
    { icon: '🎨', title: 'Design Sur-Mesure', description: 'Création unique adaptée à votre image' },
    { icon: '📱', title: '100% Responsive', description: 'Parfait sur mobile, tablette et desktop' }
  ]);

export const parseProcessSteps = (processSteps: string) =>
  safeJSONParse(processSteps, [
    { icon: '📋', title: 'Analyse', description: 'Étude de vos besoins et objectifs' },
    { icon: '🎨', title: 'Conception', description: 'Création du design et de la structure' },
    { icon: '⚙️', title: 'Développement', description: 'Codage et intégration des fonctionnalités' },
    { icon: '🚀', title: 'Lancement', description: 'Mise en ligne et formation' }
  ]);

// =====================================================================
// BRIDGE PRINCIPAL - TRANSFORMATION COMPLÈTE
// =====================================================================

export const bridgeModalToConfigurator = (modalData: ModalFormData): Partial<ConfiguratorFormData> => {
  console.log('🌉 BRIDGE DEBUG - Input modalData:', modalData);
  console.log('🌉 BRIDGE EMAIL DEBUG - modalData.email:', modalData.email);
  console.log('🌉 BRIDGE COMPANY DEBUG - modalData.companyName:', modalData.companyName);
  
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
    
    // 🎯 HERO FIELDS - Nouveaux champs dédiés
    heroTitle: modalData.heroTitle || '',
    heroSubtitle: modalData.heroSubtitle || '',
    heroCtaText: modalData.heroCtaText || '',
    heroCtaButton: modalData.heroCtaButton || '',
    heroImage: modalData.heroImage || '',
    
    // 👤 ABOUT FIELDS - Champs About complets
    about: {
      title: modalData.aboutTitle || '',
      description: modalData.aboutDescription || '',
      image: modalData.aboutImage || '',
      values: parseAboutValues(modalData.aboutValues)
    },
    
    // 🔄 PROCESS FIELDS - Champs Process complets
    process: {
      title: modalData.processTitle || '',
      subtitle: modalData.processSubtitle || '',
      description: modalData.processDescription || '',
      steps: parseProcessSteps(modalData.processSteps)
    },
    
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
    },
    
    // FAQ : JSON string → Object structure
    faq: {
      sectionTitle: 'Questions Fréquentes',
      sectionSubtitle: 'Tout ce que vous devez savoir',
      items: parseFaq(modalData.faqItems)
    },
    
    // Contact : URLs externes et informations de contact
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à démarrer votre projet ?',
      email: modalData.email || '',
      phone: modalData.phone || '',
      address: modalData.contactAddress || '',
      ctaText: 'Prendre contact',
      googleMapsUrl: modalData.googleMapsUrl || '',
      calendarUrl: modalData.calendarUrl || '',
      bookingUrl: modalData.bookingUrl || ''
    }
  };

  // Log pour debugging (à supprimer en production)
  console.log('🌉 Bridge Modal→Configurateur:', {
    input: {
      email: modalData.email,
      companyName: modalData.companyName,
      servicesItems: modalData.servicesItems?.length || 0,
      portfolioItems: modalData.portfolioItems?.length || 0,
      featuresItems: modalData.featuresItems?.length || 0
    },
    output: {
      email: bridged.email,
      companyName: bridged.companyName,
      services: bridged.services.packages.length,
      portfolio: bridged.portfolio.projects.length,
      features: bridged.features.items.length
    }
  });
  
  console.log('🌉 BRIDGE RESULT - Final bridged object:', bridged);

  return bridged;
};

// =====================================================================
// BRIDGE INVERSE - CONFIGURATEUR → MODAL
// =====================================================================

export const bridgeConfiguratorToModal = (configuratorData: Partial<ConfiguratorFormData>): Partial<ModalFormData> => {
  const bridged = {
    // Champs simples (direct copy)
    companyName: configuratorData.companyName || '',
    email: configuratorData.email || '',
    phone: configuratorData.phone || '',
    tagline: configuratorData.tagline || '',
    ctaLabel: configuratorData.ctaLabel || '',
    logoUrl: configuratorData.logoUrl || '',
    instagramUrl: configuratorData.instagramUrl || '',
    linkedinUrl: configuratorData.linkedinUrl || '',
    
    // 🎯 HERO FIELDS - Nouveaux champs dédiés (Configurator → Modal)
    heroTitle: configuratorData.heroTitle || '',
    heroSubtitle: configuratorData.heroSubtitle || '',
    heroCtaText: configuratorData.heroCtaText || '',
    heroCtaButton: configuratorData.heroCtaButton || '',
    heroImage: configuratorData.heroImage || '',
    
    // 👤 ABOUT FIELDS - Champs About complets (Configurator → Modal)
    aboutTitle: configuratorData.aboutTitle || '',
    aboutDescription: configuratorData.aboutDescription || '',
    aboutImage: configuratorData.aboutImage || '',
    aboutValues: configuratorData.aboutValues || '',
    
    // Services : Object structure → JSON string
    servicesDescription: configuratorData.services?.sectionTitle || '',
    servicesItems: configuratorData.services?.packages ? JSON.stringify(
      configuratorData.services.packages.map((pkg: any) => ({
        title: pkg.name || '',          // ✅ CORRIGÉ: utiliser pkg.name
        description: pkg.description || '',
        price: pkg.price || '',
        features: pkg.features || [],
        highlighted: pkg.highlighted || false,
        ctaText: pkg.ctaText || 'Commander'
      }))
    ) : '',
    
    // Portfolio : Object structure → JSON string
    portfolioDescription: configuratorData.portfolio?.sectionTitle || '',
    portfolioItems: configuratorData.portfolio?.projects ? JSON.stringify(
      configuratorData.portfolio.projects.map((project: any) => ({
        title: project.title || '',
        category: project.category || '',
        description: project.description || '',
        imageUrl: project.imageUrl || '',  // ✅ CORRIGÉ: utiliser imageUrl
        projectUrl: project.projectUrl || ''  // ✅ CORRIGÉ: utiliser projectUrl
      }))
    ) : '',
    
    // Features : Object structure → JSON string
    featuresItems: configuratorData.features?.items ? JSON.stringify(
      configuratorData.features.items.map((feature: any) => ({
        title: feature.title || '',
        description: feature.description || '',
        icon: feature.icon || '⚡'
      }))
    ) : '',
    
    // Testimonials : Object structure → JSON string
    testimonialsItems: configuratorData.testimonials?.items ? JSON.stringify(
      configuratorData.testimonials.items.map((testimonial: any) => ({
        name: testimonial.name || '',
        role: testimonial.role || '',
        content: testimonial.content || testimonial.text || '', // content en priorité
        rating: testimonial.rating || 5,
        avatarUrl: testimonial.avatarUrl || ''
      }))
    ) : '',
    
    // FAQ : Object structure → JSON string
    faqItems: configuratorData.faq?.items ? JSON.stringify(
      configuratorData.faq.items.map((faqItem: any) => ({
        question: faqItem.question || '',
        answer: faqItem.answer || ''
      }))
    ) : ''
  };

  // Log pour debugging
  console.log('🌉 Bridge Configurateur→Modal:', {
    input: {
      services: configuratorData.services?.packages?.length || 0,
      portfolio: configuratorData.portfolio?.projects?.length || 0,
      features: configuratorData.features?.items?.length || 0
    },
    output: {
      servicesItems: bridged.servicesItems?.length || 0,
      portfolioItems: bridged.portfolioItems?.length || 0,
      featuresItems: bridged.featuresItems?.length || 0
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