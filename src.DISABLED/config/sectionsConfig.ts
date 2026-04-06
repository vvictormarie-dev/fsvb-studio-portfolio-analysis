/*
=== CONFIGURATION GLOBALE DES SECTIONS ===
Organisation des sections en familles : communes et spécifiques par template
*/

// Sections communes à tous les templates
export const commonSections = [
  "navbar",     // Navigation principale (obligatoire)
  "hero",       // Section d'accueil principale
  "about",      // Présentation/À propos
  "testimonials", // Témoignages clients
  "contact",    // Formulaire de contact
  "footer"      // Pied de page
] as const;

// Sections spécifiques au template Landing Solo
export const landingSections = [
  "trustbar",    // Statistiques de confiance
  "services",    // Grille des offres/packages
  "portfolio",   // Réalisations clients
  "features",    // Avantages/différenciation
  "process",     // Comment ça marche
  "comparison",  // Avec/sans site
  "cta-middle",  // Appel à l'action milieu de page
  "faq",         // Questions fréquentes
  "urgency",     // Badge d'urgence
  "guarantee",   // Section garanties
  "cta-final"    // Dernière chance de conversion
] as const;

// Sections spécifiques au template Restaurant
export const restaurantSections = [
  "specialties",   // Spécialités de la maison
  "menu",          // Carte complète avec prix
  "gallery",       // Photos restaurant et plats
  "hoursLocation", // Horaires et localisation
  "reservation",   // Formulaire réservation
  "events"         // Événements et privatisation
] as const;

// Sections spécifiques au template Coach
export const coachSections = [
  "approach",       // Méthode et philosophie
  "domains",        // Domaines d'accompagnement
  "services",       // Formules et tarifs (note: même ID que landing mais contexte différent)
  "certifications", // Formations et diplômes
  "faq",           // Questions fréquentes coaching (note: même ID que landing mais contexte différent)
  "booking"        // Prise de rendez-vous
] as const;

// Objet regroupant toutes les sections spécifiques par template
export const templateSpecificSections = {
  landing: landingSections,
  restaurant: restaurantSections,
  coach: coachSections,
} as const;

// Types dérivés pour la sécurité de type
export type CommonSection = typeof commonSections[number];
export type LandingSection = typeof landingSections[number];
export type RestaurantSection = typeof restaurantSections[number];
export type CoachSection = typeof coachSections[number];
export type TemplateType = keyof typeof templateSpecificSections;

// Utilitaires pour récupérer toutes les sections d'un template
export const getAllSectionsForTemplate = (template: TemplateType) => {
  return [...commonSections, ...templateSpecificSections[template]] as const;
};

// Vérifier si une section est commune à tous les templates
export const isCommonSection = (sectionId: string): sectionId is CommonSection => {
  return commonSections.includes(sectionId as CommonSection);
};

// Vérifier si une section est spécifique à un template
export const isTemplateSpecificSection = (sectionId: string, template: TemplateType): boolean => {
  const templateSections = templateSpecificSections[template];
  return templateSections ? (templateSections as readonly string[]).includes(sectionId) : false;
};