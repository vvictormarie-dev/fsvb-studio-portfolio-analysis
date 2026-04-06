/*
=== STRUCTURE SECTIONS COACH ===
Configuration pour l'activation/désactivation des sections du template Coach
*/

export interface CoachSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  required?: boolean; // Sections obligatoires qui ne peuvent pas être désactivées
  configurable?: boolean; // Si la section accepte des props configurables
  description?: string; // Description de la section
  props?: Record<string, any>; // Props disponibles pour la configuration
}

/*
ANALYSE STRUCTURELLE - 12 SECTIONS IDENTIFIÉES :
1. Navbar - Navigation principale (OBLIGATOIRE)
2. Hero - Section d'accueil coach (OBLIGATOIRE) 
3. About - Parcours personnel du coach (OPTIONNELLE)
4. Approach - Méthode et philosophie (OPTIONNELLE)
5. Domains - Domaines d'accompagnement (OBLIGATOIRE)
6. Services - Formules et tarifs (OBLIGATOIRE)
7. Certifications - Formations et diplômes (OPTIONNELLE)
8. Testimonials - Témoignages clients (OPTIONNELLE)
9. FAQ - Questions fréquentes coaching (OPTIONNELLE)
10. Booking - Prise de rendez-vous (OBLIGATOIRE)
11. Contact - Formulaire de contact (OPTIONNELLE)
12. Footer - Pied de page (OBLIGATOIRE)
*/

export const coachSectionsDefault: CoachSectionConfig[] = [
  {
    id: "navbar",
    label: "Navigation",
    enabled: true,
    required: true,
    configurable: true
  },
  {
    id: "hero",
    label: "En-tête principal",
    enabled: true,
    required: true,
    configurable: true
  },
  {
    id: "about",
    label: "Mon parcours",
    enabled: true,
    required: false,
    configurable: true,
    description: "Présentation personnelle du coach"
  },
  {
    id: "approach",
    label: "Ma méthode",
    enabled: true,
    required: false,
    configurable: true,
    description: "Approche et philosophie de coaching"
  },
  {
    id: "domains",
    label: "Mes domaines",
    enabled: true,
    required: true,
    configurable: true,
    description: "Domaines d'accompagnement"
  },
  {
    id: "services",
    label: "Mes formules",
    enabled: true,
    required: true,
    configurable: true,
    description: "Types de séances et tarifs"
  },
  {
    id: "certifications",
    label: "Formations",
    enabled: false,
    required: false,
    configurable: true,
    description: "Diplômes et certifications"
  },
  {
    id: "testimonials",
    label: "Témoignages",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "faq",
    label: "Questions fréquentes",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "booking",
    label: "Prendre RDV",
    enabled: true,
    required: true,
    configurable: true,
    description: "Réservation de séance"
  },
  {
    id: "contact",
    label: "Contact",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "footer",
    label: "Pied de page",
    enabled: true,
    required: true,
    configurable: true
  }
];

export type CoachSectionId = keyof typeof coachSections;

// Export des sections sous forme d'objet pour l'accès facile
export const coachSections = Object.fromEntries(
  coachSectionsDefault.map(section => [section.id, section])
) as Record<string, CoachSectionConfig>;