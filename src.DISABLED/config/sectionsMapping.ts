/*
=== SYSTÈME DE MAPPING SECTIONS FSVB STUDIO ===
Mapping exhaustif : FormData → Props → Preview
Résout les problèmes d'inputs bloqués et useEffect manquants
*/

export interface SectionMapping {
  // Configuration du mapping
  id: string;
  label: string;
  
  // Sources de données
  formDataFields: {
    [key: string]: {
      source: string;          // Nom du champ dans formData
      type: 'string' | 'json' | 'boolean' | 'number';
      parser?: (value: any) => any; // Fonction de parsing si nécessaire
      defaultValue?: any;      // Valeur par défaut
    }
  };
  
  // Mapping vers props
  propsMapping: {
    [key: string]: string;     // 'propName': 'formDataField'
  };
  
  // Configuration useEffect
  useEffect: {
    dependencies: string[];    // Champs formData à écouter
    condition?: string;        // Condition d'activation (optionnelle)
  };
  
  // Notes techniques
  notes?: string;
  
  // Méthodes de bridge (ajoutées dynamiquement)
  extractFormData?: (formData: any) => any;
  generateProps?: (sectionData: any) => any;
}

// =====================================================================
// MAPPING COMPLET - TOUTES LES SECTIONS
// =====================================================================

export const SECTIONS_MAPPING: Record<string, SectionMapping> = {
  
  // ✅ HERO - Fonctionne déjà bien
  hero: {
    id: 'hero',
    label: 'Section Hero',
    formDataFields: {
      title: { source: 'companyName', type: 'string' },
      subtitle: { source: 'tagline', type: 'string' },
      ctaText: { source: 'ctaLabel', type: 'string' }
    },
    propsMapping: {
      title: 'title',
      subtitle: 'subtitle', 
      primaryCtaText: 'ctaText'
    },
    useEffect: {
      dependencies: ['companyName', 'tagline', 'ctaLabel'],
      condition: 'formData.companyName || formData.tagline || formData.ctaLabel'
    },
    notes: 'Titre auto-généré avec companyName'
  },

  // ❌ SERVICES - useEffect cassé (props statiques)
  services: {
    id: 'services',
    label: 'Section Services',
    formDataFields: {
      description: { source: 'servicesDescription', type: 'string' },
      items: { 
        source: 'servicesItems', 
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { title: '', description: '', price: '', features: [] },
              { title: '', description: '', price: '', features: [] },
              { title: '', description: '', price: '', features: [] }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      subtitle: 'subtitle',
      description: 'description',
      services: 'items'
    },
    useEffect: {
      dependencies: ['servicesDescription', 'servicesItems', 'companyName'],
      condition: 'formData.servicesDescription || formData.servicesItems'
    },
    notes: 'Items répétables (max 3) - useEffect à corriger'
  },

  // ❌ PORTFOLIO - Pas de useEffect
  portfolio: {
    id: 'portfolio',
    label: 'Section Portfolio',
    formDataFields: {
      description: { source: 'portfolioDescription', type: 'string' },
      items: {
        source: 'portfolioItems',
        type: 'json', 
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { title: '', description: '', imageUrl: '', projectUrl: '' },
              { title: '', description: '', imageUrl: '', projectUrl: '' },
              { title: '', description: '', imageUrl: '', projectUrl: '' }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      description: 'description',
      projects: 'items'
    },
    useEffect: {
      dependencies: ['portfolioDescription', 'portfolioItems'],
      condition: 'formData.portfolioDescription || formData.portfolioItems'
    },
    notes: 'Items répétables (max 3) - useEffect manquant'
  },

  // ❌ FEATURES - Pas de useEffect  
  features: {
    id: 'features',
    label: 'Section Features/Avantages',
    formDataFields: {
      items: {
        source: 'featuresItems',
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { icon: '⚡', title: '', description: '' },
              { icon: '🎨', title: '', description: '' },
              { icon: '📱', title: '', description: '' }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      features: 'items'
    },
    useEffect: {
      dependencies: ['featuresItems'],
      condition: 'formData.featuresItems'
    },
    notes: 'Items répétables (max 4) - useEffect manquant'
  },

  // ❌ PROCESS - Pas de useEffect
  process: {
    id: 'process',
    label: 'Section Process/Comment ça marche',
    formDataFields: {
      items: {
        source: 'processSteps',
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { title: '', description: '', step: 1 },
              { title: '', description: '', step: 2 },
              { title: '', description: '', step: 3 }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      steps: 'items'
    },
    useEffect: {
      dependencies: ['processSteps'],
      condition: 'formData.processSteps'
    },
    notes: 'Items répétables (max 4) - useEffect manquant'
  },

  // ❌ TESTIMONIALS - Pas de useEffect
  testimonials: {
    id: 'testimonials',
    label: 'Section Témoignages',
    formDataFields: {
      items: {
        source: 'testimonialsItems',
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { name: '', role: '', content: '', rating: 5, avatarUrl: '' },
              { name: '', role: '', content: '', rating: 5, avatarUrl: '' }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      subtitle: 'subtitle',
      testimonials: 'items'
    },
    useEffect: {
      dependencies: ['testimonialsItems'],
      condition: 'formData.testimonialsItems'
    },
    notes: 'Items répétables (max 3) - useEffect manquant'
  },

  // ❌ FAQ - Pas de useEffect
  faq: {
    id: 'faq',
    label: 'Section FAQ',
    formDataFields: {
      items: {
        source: 'faqItems',
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { question: '', answer: '' },
              { question: '', answer: '' },
              { question: '', answer: '' }
            ];
          }
        },
        defaultValue: []
      }
    },
    propsMapping: {
      title: 'title',
      subtitle: 'subtitle', 
      faqs: 'items'
    },
    useEffect: {
      dependencies: ['faqItems'],
      condition: 'formData.faqItems'
    },
    notes: 'Items répétables (max 5) - useEffect manquant'
  },

  // ✅ ABOUT - Fonctionne mais écrase titre manuel
  about: {
    id: 'about',
    label: 'Section About/À propos',
    formDataFields: {
      description: { source: 'aboutDescription', type: 'string' },
      values: {
        source: 'aboutValues',
        type: 'json',
        parser: (jsonString: string) => {
          try {
            return JSON.parse(jsonString || '[]');
          } catch {
            return [
              { icon: "⚡", title: "Livraison Express", description: "Votre site prêt en 3 jours maximum" },
              { icon: "🎨", title: "Design Sur-Mesure", description: "Création unique adaptée à votre image" },
              { icon: "📱", title: "100% Responsive", description: "Parfait sur mobile, tablette et desktop" }
            ];
          }
        }
      }
    },
    propsMapping: {
      title: 'title',
      description: 'description',
      values: 'values'
    },
    useEffect: {
      dependencies: ['companyName', 'logoUrl', 'aboutDescription', 'aboutValues'],
      condition: 'formData.companyName || formData.aboutDescription'
    },
    notes: 'Titre auto-généré mais ne pas écraser valeur manuelle'
  },

  // ✅ CONTACT - Fonctionne bien  
  contact: {
    id: 'contact',
    label: 'Section Contact',
    formDataFields: {
      email: { source: 'email', type: 'string' },
      phone: { source: 'phone', type: 'string' },
      address: { source: 'contactAddress', type: 'string' },
      city: { source: 'contactCity', type: 'string' },
      formEmail: { source: 'contactFormEmail', type: 'string' },
      autoReply: { source: 'autoReplyMessage', type: 'string' }
    },
    propsMapping: {
      title: 'title',
      subtitle: 'subtitle',
      email: 'email',
      phone: 'phone',
      address: 'address'
    },
    useEffect: {
      dependencies: ['email', 'phone', 'companyName', 'contactAddress', 'contactCity'],
      condition: 'formData.email || formData.phone || formData.companyName'
    },
    notes: 'Fonctionne bien'
  },

  // ✅ FOOTER - Fonctionne bien
  footer: {
    id: 'footer',
    label: 'Section Footer',
    formDataFields: {
      brandText: { source: 'companyName', type: 'string' },
      logoUrl: { source: 'logoUrl', type: 'string' },
      instagram: { source: 'instagramUrl', type: 'string' },
      linkedin: { source: 'linkedinUrl', type: 'string' }
    },
    propsMapping: {
      brandText: 'brandText',
      brandLogoUrl: 'logoUrl',
      instagramUrl: 'instagram',
      linkedinUrl: 'linkedin'
    },
    useEffect: {
      dependencies: ['instagramUrl', 'linkedinUrl', 'companyName', 'logoUrl'],
      condition: 'formData.instagramUrl || formData.linkedinUrl || formData.companyName || formData.logoUrl'
    },
    notes: 'Fonctionne bien'
  }
};

// =====================================================================
// UTILITAIRES MAPPING
// =====================================================================

export const getSectionMapping = (sectionId: string): SectionMapping | null => {
  return SECTIONS_MAPPING[sectionId] || null;
};

export const getAllMappedSections = (): string[] => {
  return Object.keys(SECTIONS_MAPPING);
};

export const getSectionsByStatus = (status: 'working' | 'broken' | 'missing') => {
  const working = ['hero', 'contact', 'footer'];
  const broken = ['services', 'about'];  
  const missing = ['portfolio', 'features', 'process', 'testimonials', 'faq'];
  
  switch (status) {
    case 'working': return working;
    case 'broken': return broken;
    case 'missing': return missing;
    default: return [];
  }
};

// =====================================================================
// GÉNÉRATEUR D'USEEFFECT AUTOMATIQUE
// =====================================================================

export const generateUseEffectCode = (sectionId: string): string => {
  const mapping = getSectionMapping(sectionId);
  if (!mapping) return '';

  const { useEffect: { dependencies, condition }, formDataFields, propsMapping } = mapping;
  
  let propsCode = '';
  
  // Génération du code props selon le mapping
  Object.entries(propsMapping).forEach(([propKey, formKey]) => {
    const fieldConfig = formDataFields[formKey];
    if (!fieldConfig) return;

    if (fieldConfig.type === 'json' && fieldConfig.parser) {
      propsCode += `        ${propKey}: ${fieldConfig.parser.toString()}(formData.${fieldConfig.source}),\n`;
    } else {
      propsCode += `        ${propKey}: formData.${fieldConfig.source}${fieldConfig.defaultValue ? ` || '${fieldConfig.defaultValue}'` : ''},\n`;
    }
  });

  return `
  // ${mapping.label} - Généré automatiquement depuis mapping
  useEffect(() => {
    if (${condition || 'true'}) {
      updateSectionProps('${sectionId}', {
${propsCode}      });
    }
  }, [${dependencies.map(dep => `formData.${dep}`).join(', ')}]);
`;
};

export default SECTIONS_MAPPING;

// =====================================================================
// UTILITAIRES DE BRIDGE
// =====================================================================

// Ajouter les méthodes manquantes aux mappings
Object.entries(SECTIONS_MAPPING).forEach(([, mapping]) => {
  // Méthode pour extraire les données pertinentes du formData
  mapping.extractFormData = (formData: any) => {
    const extracted: any = {};
    
    Object.entries(mapping.formDataFields).forEach(([fieldName, config]) => {
      const value = formData[config.source];
      if (value !== undefined && value !== '') {
        extracted[fieldName] = config.parser ? config.parser(value) : value;
      }
    });
    
    return extracted;
  };
  
  // Méthode pour générer les props à partir des données extraites
  mapping.generateProps = (sectionData: any) => {
    const props: any = {};
    
    Object.entries(mapping.propsMapping).forEach(([propName, fieldName]) => {
      if (sectionData[fieldName] !== undefined) {
        props[propName] = sectionData[fieldName];
      }
    });
    
    return props;
  };
});