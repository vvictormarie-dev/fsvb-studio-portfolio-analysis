/*
=== MAPPING PROPS PAR SECTION ===
Configuration centralisée des champs éditables pour chaque section de chaque template
Basé sur l'audit des composants réels (TemplateNavbar, AboutSection, etc.)
*/

export type FieldType =
  | "short-text"     // Champ texte court (titre, label)
  | "long-text"      // Champ texte long (description, paragraphe)
  | "rich-text"      // Texte enrichi (markdown/HTML)
  | "url"            // Lien URL
  | "image-url"      // URL d'image
  | "list"           // Liste d'éléments structurés
  | "email"          // Adresse email
  | "phone"          // Numéro de téléphone
  | "price"          // Prix (format monétaire)
  | "address"        // Adresse postale
  | "time"           // Heure (format time)
  | "date"           // Date
  | "number"         // Nombre entier
  | "boolean";       // Case à cocher

export interface SectionFieldConfig {
  key: string;           // Clé de la propriété (ex: "title", "subtitle")
  label: string;         // Label affiché dans le configurateur
  type: FieldType;       // Type de champ
  required?: boolean;    // Champ obligatoire
  placeholder?: string;  // Texte d'exemple
  help?: string;         // Texte d'aide
  maxLength?: number;    // Limite de caractères
  defaultValue?: any;    // Valeur par défaut
  itemStructure?: Record<string, string>; // Structure des items pour type "list"
}

export interface SectionPropsKey {
  template: "landing-solo" | "restaurant" | "coach" | "common";
  sectionId: string;
}

/*
=== MAPPING PRINCIPAL ===
Clé format: `${template}:${sectionId}` ou `common:${sectionId}`
Réorganisé avec sections communes et spécifiques après audit complet
*/

export const sectionPropsMapping: Record<string, SectionFieldConfig[]> = {

  // ========================================
  // SECTIONS COMMUNES (tous templates)
  // ========================================

  "common:navbar": [
    {
      key: "logoText",
      label: "Texte du logo",
      type: "short-text",
      required: true,
      maxLength: 30,
      placeholder: "Ex: Mon Entreprise"
    },
    {
      key: "logoUrl",
      label: "URL du logo (optionnel)",
      type: "image-url",
      placeholder: "https://.../logo.png"
    },
    {
      key: "layout",
      label: "Style de navigation",
      type: "short-text",
      required: true,
      placeholder: "classic|centered|split",
      defaultValue: "classic",
      help: "Style d'affichage de la navigation"
    },
    {
      key: "visibleSectionIds",
      label: "Sections à afficher",
      type: "list",
      help: "IDs des sections affichées dans la navbar (géré via checkboxes)"
    }
  ],

  "common:hero": [
    { key: "title", label: "Titre principal", type: "short-text", required: true, maxLength: 60, defaultValue: "Bienvenue sur notre site" },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80, defaultValue: "Découvrez nos services" },
    { key: "description", label: "Description", type: "long-text", maxLength: 200 },
    { key: "primaryCtaLabel", label: "Texte bouton principal", type: "short-text", maxLength: 25 },
    { key: "primaryCtaUrl", label: "Lien bouton principal", type: "url" },
    { key: "secondaryCtaLabel", label: "Texte bouton secondaire", type: "short-text", maxLength: 25 },
    { key: "secondaryCtaUrl", label: "Lien bouton secondaire", type: "url" },
    { key: "backgroundImage", label: "Image de fond", type: "image-url" }
  ],

  "common:about": [
    {
      key: "title",
      label: "Titre de la section",
      type: "short-text",
      required: true,
      maxLength: 60,
      placeholder: "Ex: À propos de nous",
      defaultValue: "À propos de nous"
    },
    {
      key: "description",
      label: "Description",
      type: "long-text",
      required: true,
      maxLength: 500,
      placeholder: "Présentez votre entreprise, votre histoire..."
    },
    {
      key: "image",
      label: "Image principale",
      type: "image-url",
      required: true,
      placeholder: "URL de l'image"
    },
    {
      key: "values",
      label: "Points clés",
      type: "list",
      required: true,
      itemStructure: {
        icon: "string",
        title: "string",
        description: "string"
      },
      help: "2-4 valeurs qui vous représentent"
    },
    {
      key: "ctaText",
      label: "Texte du bouton (optionnel)",
      type: "short-text",
      maxLength: 25,
      placeholder: "Ex: En savoir plus"
    },
    {
      key: "ctaLink",
      label: "Lien du bouton (optionnel)",
      type: "url",
      placeholder: "#contact"
    }
  ],

  "common:testimonials": [
    {
      key: "title",
      label: "Titre de la section",
      type: "short-text",
      required: true,
      maxLength: 60,
      placeholder: "Ex: Ce que disent nos clients",
      defaultValue: "Ce que disent nos clients"
    },
    {
      key: "subtitle",
      label: "Sous-titre",
      type: "short-text",
      maxLength: 100,
      placeholder: "Ex: Ils nous font confiance"
    },
    {
      key: "testimonials",
      label: "Témoignages clients",
      type: "list",
      required: true,
      defaultValue: [],
      itemStructure: {
        id: "string",
        name: "string", 
        role: "string",
        company: "string",
        image: "string",
        rating: "number",
        text: "string"
      },
      help: "Liste des avis clients (nom, poste, entreprise, note, témoignage)"
    }
  ],

  "common:contact": [
    {
      key: "title",
      label: "Titre de la section",
      type: "short-text",
      required: true,
      maxLength: 60,
      placeholder: "Ex: Contactez-nous",
      defaultValue: "Contactez-nous"
    },
    {
      key: "subtitle",
      label: "Sous-titre",
      type: "short-text",
      maxLength: 100,
      placeholder: "Ex: Nous répondons sous 24h"
    },
    {
      key: "submitText",
      label: "Texte bouton envoi",
      type: "short-text",
      maxLength: 25,
      placeholder: "Ex: Envoyer",
      defaultValue: "Envoyer"
    },
    {
      key: "showPhone",
      label: "Afficher champ téléphone",
      type: "boolean",
      defaultValue: true
    },
    {
      key: "contactEmail",
      label: "Email de contact (optionnel)",
      type: "email",
      placeholder: "contact@entreprise.com"
    },
    {
      key: "contactPhone",
      label: "Téléphone de contact (optionnel)",
      type: "phone", 
      placeholder: "+33 1 23 45 67 89"
    },
    {
      key: "contactAddress",
      label: "Adresse (optionnelle)",
      type: "address",
      placeholder: "123 rue Example, 75001 Paris"
    }
  ],

  "common:footer": [
    {
      key: "brandText",
      label: "Nom de la marque",
      type: "short-text",
      required: true,
      maxLength: 50,
      placeholder: "Ex: Mon Entreprise"
    },
    {
      key: "brandLogoUrl",
      label: "URL du logo (optionnel)",
      type: "image-url",
      placeholder: "https://.../logo.png"
    },
    {
      key: "legalText",
      label: "Texte légal / Copyright",
      type: "long-text",
      maxLength: 300,
      placeholder: "Ex: © 2025 Mon Entreprise - Tous droits réservés"
    },
    {
      key: "sections",
      label: "Sections du footer",
      type: "list",
      itemStructure: {
        title: "string",
        links: "array"
      },
      help: "Sections avec liens organisés (Services, Légal, etc.)"
    },
    {
      key: "socialLinks",
      label: "Réseaux sociaux",
      type: "list",
      itemStructure: {
        platform: "string",
        url: "string",
        icon: "string"
      },
      help: "Liens vers réseaux sociaux (Facebook, Instagram, LinkedIn, etc.)"
    },
    {
      key: "instagramUrl",
      label: "Lien Instagram (optionnel)",
      type: "url",
      placeholder: "https://instagram.com/..."
    },
    {
      key: "linkedinUrl",
      label: "Lien LinkedIn (optionnel)",
      type: "url",
      placeholder: "https://linkedin.com/company/..."
    }
  ],

  // ========================================
  // LANDING SOLO - Sections spécifiques
  // ========================================

  "landing-solo:trustBar": [
    { 
      key: "stats", 
      label: "Statistiques", 
      type: "list", 
      itemStructure: {
        value: "string",
        label: "string",
        icon: "string"
      },
      help: "Liste des statistiques de confiance (valeur, libellé, icône)" 
    }
  ],

  "landing-solo:services": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50, defaultValue: "Nos services" },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { 
      key: "services", 
      label: "Services/Packages", 
      type: "list", 
      required: true,
      defaultValue: [],
      itemStructure: {
        id: "string",
        icon: "string",
        title: "string", 
        description: "string",
        price: "string",
        features: "array"
      },
      help: "Liste des services proposés (titre, description, prix, fonctionnalités)" 
    }
  ],

  "landing-solo:portfolio": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50, defaultValue: "Nos réalisations" },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { 
      key: "projects", 
      label: "Projets", 
      type: "list", 
      required: true,
      defaultValue: [],
      itemStructure: {
        id: "string",
        title: "string",
        description: "string",
        image: "string",
        category: "string",
        link: "string",
        technologies: "array"
      },
      help: "Liste des réalisations (titre, description, image, catégorie, lien, technologies)" 
    },
    {
      key: "columns",
      label: "Nombre de colonnes",
      type: "number",
      placeholder: "2|3|4",
      defaultValue: 3,
      help: "Disposition en grille (2, 3 ou 4 colonnes)"
    },
    {
      key: "showAll",
      label: "Afficher tous les projets",
      type: "boolean",
      defaultValue: false,
      help: "Si false, limite l'affichage initial"
    }
  ],

  "landing-solo:features": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50, defaultValue: "Nos avantages" },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { 
      key: "features", 
      label: "Avantages", 
      type: "list", 
      required: true,
      defaultValue: [],
      itemStructure: {
        id: "string",
        icon: "string",
        title: "string",
        description: "string"
      },
      help: "Liste des fonctionnalités/avantages (icône, titre, description)" 
    },
    {
      key: "columns",
      label: "Colonnes d'affichage",
      type: "number",
      placeholder: "3|4",
      defaultValue: 3,
      help: "Nombre de colonnes pour la grille (3 ou 4)"
    }
  ],

  "landing-solo:process": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { 
      key: "steps", 
      label: "Étapes", 
      type: "list", 
      required: true, 
      itemStructure: {
        id: "string",
        number: "number",
        title: "string",
        description: "string",
        icon: "string",
        duration: "string"
      },
      help: "Processus étape par étape (numéro, titre, description, icône, durée)" 
    }
  ],

  "landing-solo:comparison": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "beforeTitle", label: "Titre 'Avant'", type: "short-text", required: true },
    { key: "afterTitle", label: "Titre 'Après'", type: "short-text", required: true },
    { 
      key: "beforeItems", 
      label: "Points 'Avant'", 
      type: "list", 
      required: true,
      itemStructure: {
        text: "string",
        icon: "string"
      },
      help: "Liste des inconvénients ou problèmes (texte, icône)"
    },
    { 
      key: "afterItems", 
      label: "Points 'Après'", 
      type: "list", 
      required: true,
      itemStructure: {
        text: "string",
        icon: "string"
      },
      help: "Liste des avantages ou solutions (texte, icône)"
    }
  ],

  "landing-solo:faq": [
    { key: "title", label: "Titre de section", type: "short-text", required: true, maxLength: 50, defaultValue: "Questions fréquentes" },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { 
      key: "faqs", 
      label: "Questions-Réponses", 
      type: "list", 
      required: true,
      defaultValue: [],
      itemStructure: {
        id: "string",
        question: "string",
        answer: "string"
      },
      help: "Questions fréquentes (question, réponse)" 
    }
  ],

  "landing-solo:ctaMiddle": [
    { key: "title", label: "Titre CTA", type: "short-text", required: true, maxLength: 50 },
    { key: "description", label: "Description", type: "long-text", maxLength: 120 },
    { key: "ctaLabel", label: "Texte du bouton", type: "short-text", required: true, maxLength: 25 },
    { key: "ctaUrl", label: "Lien du bouton", type: "url", required: true }
  ],

  "landing-solo:ctaFinal": [
    { key: "title", label: "Titre CTA final", type: "short-text", required: true, maxLength: 50 },
    { key: "description", label: "Description", type: "long-text", maxLength: 120 },
    { key: "ctaLabel", label: "Texte du bouton", type: "short-text", required: true, maxLength: 25 },
    { key: "ctaUrl", label: "Lien du bouton", type: "url", required: true }
  ],

  "landing-solo:urgency": [
    { key: "message", label: "Message d'urgence", type: "short-text", required: true, maxLength: 80 },
    { key: "endDate", label: "Date de fin", type: "date" },
    {
      key: "variant",
      label: "Type d'urgence",
      type: "short-text",
      placeholder: "warning|error|success",
      defaultValue: "warning",
      help: "Style visuel de l'alerte"
    }
  ],

  "landing-solo:guarantee": [
    { key: "title", label: "Titre garantie", type: "short-text", required: true, maxLength: 50 },
    { key: "description", label: "Description garantie", type: "long-text", required: true, maxLength: 200 },
    { key: "duration", label: "Durée", type: "short-text", placeholder: "ex: 30 jours" },
    { key: "icon", label: "Icône", type: "short-text", placeholder: "ex: 🛡️" }
  ],

  // ========================================
  // RESTAURANT - Sections spécifiques
  // ========================================

  "restaurant:specialties": [
    { key: "title", label: "Titre spécialités", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "specialties", label: "Spécialités", type: "list", required: true, help: "Plats signatures du restaurant" }
  ],

  "restaurant:menu": [
    { key: "title", label: "Titre menu", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "categories", label: "Catégories menu", type: "list", required: true, help: "Entrées, plats, desserts, etc." }
  ],

  "restaurant:gallery": [
    { key: "title", label: "Titre galerie", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "photos", label: "Photos", type: "list", required: true, help: "Photos du restaurant et des plats" }
  ],

  "restaurant:hoursLocation": [
    { key: "title", label: "Titre section", type: "short-text", required: true, maxLength: 50 },
    { key: "address", label: "Adresse complète", type: "address", required: true },
    { key: "phone", label: "Téléphone", type: "phone", required: true },
    { key: "email", label: "Email", type: "email" },
    { key: "weekdayHours", label: "Horaires semaine", type: "short-text", required: true },
    { key: "weekendHours", label: "Horaires weekend", type: "short-text" },
    { key: "closedDays", label: "Jours de fermeture", type: "short-text" }
  ],

  "restaurant:reservation": [
    { key: "title", label: "Titre réservation", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "description", label: "Instructions réservation", type: "long-text" },
    { key: "phone", label: "Téléphone réservation", type: "phone", required: true },
    { key: "email", label: "Email réservation", type: "email" },
    { key: "onlineBookingUrl", label: "Lien réservation en ligne", type: "url" }
  ],

  "restaurant:events": [
    { key: "title", label: "Titre événements", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "description", label: "Description services", type: "long-text", maxLength: 200 },
    { key: "events", label: "Types d'événements", type: "list", help: "Privatisation, anniversaires, etc." },
    { key: "contactEmail", label: "Email événements", type: "email" },
    { key: "contactPhone", label: "Téléphone événements", type: "phone" }
  ],

  // ========================================
  // COACH - Sections spécifiques
  // ========================================

  "coach:approach": [
    { key: "title", label: "Titre méthode", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre philosophie", type: "short-text", maxLength: 80 },
    { key: "philosophy", label: "Approche coaching", type: "long-text", required: true, maxLength: 300 },
    { key: "steps", label: "Étapes méthode", type: "list", required: true, help: "Processus d'accompagnement" }
  ],

  "coach:domains": [
    { key: "title", label: "Titre domaines", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "domains", label: "Domaines d'expertise", type: "list", required: true, help: "Spécialisations du coach" }
  ],

  "coach:services": [
    { key: "title", label: "Titre formules", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "description", label: "Description services", type: "long-text" },
    { key: "packages", label: "Formules coaching", type: "list", required: true, help: "Séances et tarifs" }
  ],

  "coach:certifications": [
    { key: "title", label: "Titre formations", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "certifications", label: "Formations", type: "list", required: true, help: "Diplômes et certifications" },
    { key: "continuingEducation", label: "Formation continue", type: "long-text" }
  ],

  "coach:faq": [
    { key: "title", label: "Titre FAQ", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "faqs", label: "Questions-Réponses", type: "list", required: true, help: "Questions sur le coaching" }
  ],

  "coach:booking": [
    { key: "title", label: "Titre prise RDV", type: "short-text", required: true, maxLength: 50 },
    { key: "subtitle", label: "Sous-titre", type: "short-text", maxLength: 80 },
    { key: "description", label: "Instructions RDV", type: "long-text" },
    { key: "calendarUrl", label: "Lien calendrier", type: "url", help: "Cal.com ou autre système" },
    { key: "phone", label: "Téléphone contact", type: "phone" },
    { key: "email", label: "Email contact", type: "email" },
    { key: "freeSessionDuration", label: "Durée séance découverte", type: "short-text", placeholder: "ex: 30 minutes" }
  ]
};

/*
=== FONCTIONS UTILITAIRES ===
*/

/**
 * Récupère la configuration des champs pour une section donnée
 * Gère les sections communes avec le préfixe "common:"
 */
export function getSectionFields(template: string, sectionId: string): SectionFieldConfig[] {
  // Essayer d'abord la section commune
  const commonKey = `common:${sectionId}`;
  if (sectionPropsMapping[commonKey]) {
    return sectionPropsMapping[commonKey];
  }
  
  // Sinon essayer la section spécifique au template
  const templateKey = `${template}:${sectionId}`;
  return sectionPropsMapping[templateKey] || [];
}

/**
 * Vérifie si une section a des champs configurables
 */
export function hasSectionFields(template: string, sectionId: string): boolean {
  return getSectionFields(template, sectionId).length > 0;
}

/**
 * Récupère tous les champs requis pour une section
 */
export function getRequiredFields(template: string, sectionId: string): SectionFieldConfig[] {
  return getSectionFields(template, sectionId).filter(field => field.required);
}

/**
 * Récupère la liste des sections pour un template donné
 */
export function getTemplateSections(template: string): string[] {
  const templateSections = Object.keys(sectionPropsMapping)
    .filter(key => key.startsWith(`${template}:`))
    .map(key => key.split(':')[1]);
    
  const commonSections = Object.keys(sectionPropsMapping)
    .filter(key => key.startsWith('common:'))
    .map(key => key.split(':')[1]);
    
  return Array.from(new Set([...commonSections, ...templateSections]));
}

/**
 * Récupère les valeurs par défaut pour une section donnée
 */
export function getSectionDefaults(template: string, sectionId: string): Record<string, any> {
  const fields = getSectionFields(template, sectionId);
  const defaults: Record<string, any> = {};
  
  fields.forEach(field => {
    if (field.defaultValue !== undefined) {
      defaults[field.key] = field.defaultValue;
    } else if (field.required && field.type === 'list') {
      // Si c'est une liste requise sans defaultValue, utiliser tableau vide
      defaults[field.key] = [];
    } else if (field.required && field.type === 'short-text') {
      // Si c'est un texte requis sans defaultValue, utiliser string vide
      defaults[field.key] = '';
    }
  });
  
  return defaults;
}
